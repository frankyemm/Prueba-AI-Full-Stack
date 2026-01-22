import os
from typing import List, Optional
from enum import Enum

from fastapi import FastAPI, HTTPException, BackgroundTasks
from pydantic import BaseModel, Field
from dotenv import load_dotenv

from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import PydanticOutputParser
from supabase import create_client, Client

# Cargar variables de entorno
load_dotenv()

app = FastAPI(title="AI Support Co-Pilot API")

# Configuración de Supabase
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_KEY") # Debe ser la service_role_key para bypass RLS

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Faltan variables de entorno de Supabase")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Configuración de LangChain
llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0)

# Esqueamas de Pydantic para el parser estructurado
class TicketCategory(str, Enum):
    TECNICO = "Técnico"
    FACTURACION = "Facturación"
    COMERCIAL = "Comercial"

class TicketSentiment(str, Enum):
    POSITIVO = "Positivo"
    NEUTRAL = "Neutral"
    NEGATIVO = "Negativo"

class TicketAnalysis(BaseModel):
    category: TicketCategory = Field(description="Categoría del ticket: Técnico, Facturación o Comercial")
    sentiment: TicketSentiment = Field(description="Sentimiento del ticket: Positivo, Neutral o Negativo")

# Parser estructurado
parser = PydanticOutputParser(pydantic_object=TicketAnalysis)

# Prompt de sistema (Few-shot implicito en la claridad de las instrucciones)
prompt_template = ChatPromptTemplate.from_messages([
    ("system", "Eres un experto Senior en Soporte Técnico y servicio al cliente.\n"
               "Tu tarea es analizar el ticket de soporte y extraer la categoría y el sentimiento.\n"
               "Categorías posibles: 'Técnico', 'Facturación', 'Comercial'.\n"
               "Sentimientos posibles: 'Positivo', 'Neutral', 'Negativo'.\n"
               "{format_instructions}"),
    ("user", "Ticket: {description}")
])

# Modelos para la API FastAPI
class TicketRequest(BaseModel):
    ticket_id: str
    description: str

@app.post("/process-ticket")
async def process_ticket(request: TicketRequest):
    """
    Recibe un ticket, lo analiza con IA y actualiza Supabase.
    """
    try:
        # 1. Preparar el análisis con LangChain
        _input = prompt_template.format_prompt(
            description=request.description,
            format_instructions=parser.get_format_instructions()
        )
        
        # 2. Llamada al LLM
        response = llm.invoke(_input.to_messages())
        
        # 3. Parsear la salida estructurada
        analysis = parser.parse(response.content)
        
        # 4. Actualizar Supabase
        # IMPORTANTE: Se usa la service_role_key para poder actualizar registros
        db_response = supabase.table("tickets").update({
            "category": analysis.category.value,
            "sentiment": analysis.sentiment.value,
            "processed": True
        }).eq("id", request.ticket_id).execute()
        
        if len(db_response.data) == 0:
            raise HTTPException(status_code=404, detail="Ticket no encontrado en la base de datos")

        return {
            "status": "success",
            "analysis": analysis,
            "ticket_id": request.ticket_id
        }

    except Exception as e:
        # Podríamos loguear el error aquí
        print(f"Error procesando ticket {request.ticket_id}: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error interno: {str(e)}")

@app.get("/health")
async def health_check():
    return {"status": "ok"}
