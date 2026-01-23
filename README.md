# AI-Powered Support Co-Pilot

Este proyecto es una solución integral para la gestión automatizada de tickets de soporte, utilizando Inteligencia Artificial para la clasificación y análisis de sentimiento, con una arquitectura moderna basada en eventos.

## 🚀 Arquitectura del Sistema

El sistema opera en un flujo circular diseñado para ser escalable y asíncrono:

1.  **Supabase (Base de Datos)**: Almacén central de tickets con soporte para tiempo real (Realtime).
2.  **n8n (Automatización)**: Orquestador que detecta nuevos tickets y coordina el procesamiento.
3.  **FastAPI Microservice (IA)**: Cerebro en Python que utiliza LangChain y OpenAI para analizar contenido de forma estructurada.
4.  **React Dashboard (Frontend)**: Interfaz de usuario en tiempo real que refleja los cambios instantáneamente.

---

## 🛠️ Componentes y Tecnologías

### 1. Base de Datos (Supabase)
- **Tecnología**: PostgreSQL.
- **Seguridad**: Row Level Security (RLS) endurecido.
- **Realtime**: Configurado para suscripciones en la tabla `tickets`.
- **Script**: `supabase/setup.sql`

### 2. Microservicio de IA (Python)
- **Framework**: FastAPI.
- **IA**: LangChain + OpenAI (ChatOpenAI).
- **Procesamiento**: Salida estructurada mediante Pydantic.
- **Despliegue**: Optimizado para Vercel.
- **Directorio**: `python-api/`

### 3. Automatización (n8n)
- **Trigger**: Webhook / Supabase Trigger (Insert).
- **Lógica**: Envío a Python API y actualización de Supabase.
- **Notificaciones**: Sistema de alerta por sentimiento negativo.
- **Workflow**: `n8n/AI-Powered Support Co-Pilot Workflow.json`

### 4. Dashboard (Frontend)
- **Stack**: React 18 + Vite + TypeScript.
- **Estilos**: Tailwind CSS (v4).
- **Suscripciones**: Cliente de Supabase para actualizaciones en vivo.
- **Directorio**: `frontend/`

---

## 🌐 Despliegue

El proyecto se encuentra desplegado y funcional en los siguientes enlaces:

- **Frontend (Dashboard)**: [https://prueba-ai-full-stack-frontend.vercel.app/](https://prueba-ai-full-stack-frontend.vercel.app/)
- **Microservicio (Python API)**: [https://prueba-ai-full-stack.vercel.app/process-ticket](https://prueba-ai-full-stack.vercel.app/process-ticket)

### Notas sobre el Despliegue
- **Vercel**: Tanto el frontend como el microservicio están alojados en Vercel para una integración continua y alto rendimiento.
- **Docker**: El microservicio cuenta con un archivo `Dockerfile` en su directorio, permitiendo un despliegue sencillo en plataformas basadas en contenedores como **Render** o AWS si se prefiere una alternativa a Vercel.

---

## ⚙️ Configuración y Despliegue

### Requisitos Previos
- Cuenta en Supabase.
- API Key de OpenAI.
- Instancia de n8n.

### Pasos de Instalación

1.  **Base de Datos**: Ejecuta el contenido de `supabase/setup.sql`. 
    > [!NOTE]
    > Se decidió implementar una política de lectura pública para el MVP:
    > ```sql
    > -- Permitir lectura a todos para facilitar la demo sin panel de login
    > DROP POLICY IF EXISTS "Allow authenticated read access" ON tickets;
    > CREATE POLICY "Allow public read access" ON tickets FOR SELECT TO anon, authenticated USING (true);
    > ```
    > Esta decisión se tomó para evitar la complejidad innecesaria de un sistema de autenticación completo en esta fase, priorizando la visualización inmediata de los resultados de la IA.

2.  **Backend**:
    - Entra en `python-api/`.
    - Configura las variables de entorno (`OPENAI_API_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`).
    - Despliega en Vercel o localmente con `uvicorn main:app --reload`.
3.  **n8n**: Importa el archivo JSON del workflow y configura las credenciales de Supabase y HTTP Request.
4.  **Frontend**:
    - Entra en `frontend/`.
    - Instala dependencias: `npm install`.
    - Crea un archivo `.env` con `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`.
    - Ejecuta: `npm run dev`.

---

## 👨‍💻 Autor
Proyecto desarrollado como prueba técnica para la posición de Full Stack Developer / AI Engineer.
