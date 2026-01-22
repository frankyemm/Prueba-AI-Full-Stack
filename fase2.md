**Actúa como un Senior AI Engineer experto en Python, FastAPI y LangChain.**
 
**Contexto:** Estoy desarrollando la lógica central de un "AI-Powered Support Co-Pilot" para la prueba técnica de Vivetori. El microservicio debe procesar tickets de soporte y extraer información clave. 
 
 
**Tarea:** Desarrolla el código completo para un microservicio con las siguientes especificaciones:
1. **Tecnologías:**
- **FastAPI** para la API. - **LangChain** para la orquestación del LLM (puedes usar ChatOpenAI o un modelo de Hugging Face). 
 
* **Pydantic** para definir el esquema de salida y validación de datos.
* **Supabase-py** para interactuar con la base de datos. 
 
2. **Endpoint `POST /process-ticket`:** - Debe recibir un JSON con `ticket_id` y `description`. - Utiliza un **Structured Output Parser** de LangChain para obligar al modelo a devolver EXACTAMENTE este formato JSON: - `category`: Debe ser uno de: 'Técnico', 'Facturación', 'Comercial'. - `sentiment`: Debe ser uno de: 'Positivo', 'Neutral', 'Negativo'. 
 
3. **Lógica de Negocio:**
- El prompt del sistema debe ser extremadamente preciso (Few-shot prompting si es necesario) para asegurar la clasificación correcta. - Tras obtener la clasificación, el servicio debe actualizar la fila correspondiente en la tabla `tickets` de Supabase, asignando la categoría, el sentimiento y cambiando el estado a `processed: true`. 
 
 
 
 
4. **Calidad de Código:** 

* Implementa manejo de excepciones (try-except) para errores de conexión con el LLM o con la base de datos.
* Usa variables de entorno para las credenciales (Supabase URL, Key y API Key del LLM).
* Incluye tipado estático con `typing`.
 
 
5. **Archivos de Despliegue:** 
 
* Genera el código para `main.py`.
* Proporciona un `requirements.txt` con las dependencias necesarias.
* Crea un `Dockerfile` optimizado para el despliegue en plataformas como Render o Railway. 
 
 
**Entregable:** El código completo organizado por archivos dentro de bloques de código claros.
