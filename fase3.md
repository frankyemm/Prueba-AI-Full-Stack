**Actúa como un Experto en n8n y Automatización de Procesos.**
 
**Contexto:** Estoy configurando el flujo de trabajo para un "AI-Powered Support Co-Pilot". Ya tengo una tabla en Supabase y una API en FastAPI que procesa tickets.
 
 
**Tarea:** Genera la configuración detallada (en formato de descripción de nodos o pseudocódigo lógico que pueda convertir a JSON) para un flujo de n8n que incluya:
1.  **Nodo Trigger (Supabase):** Configurado para activarse cuando se inserte una "Nueva Fila" en la tabla `tickets`.
2.  **Nodo HTTP Request:** Debe realizar una petición `POST` a la URL del microservicio de Python (`/process-ticket`), enviando el `id` y la `description` del ticket recién creado.
3.  **Nodo IF (Lógica de Sentimiento):** Evalúa la respuesta de la API. Si el campo `sentiment` es igual a "Negativo", el flujo debe tomar la ruta verdadera.
4.  **Nodo de Notificación (Email):** En la ruta verdadera del IF, configura un nodo (Gmail o SMTP) para enviar un correo de alerta simulado informando sobre un ticket con sentimiento negativo.
5.  **Valor Agregado (Plus):** Incluye un nodo adicional de "Wait" o un nodo de "Error Trigger" para manejar posibles caídas del microservicio de Python, asegurando la robustez del sistema.
 
 
**Especificaciones Técnicas:**
* Asegúrate de que el mapeo de datos entre el Trigger y la petición HTTP sea correcto.
* Explica cómo importar este flujo mediante el archivo `.json` exportado.
 
**Entregable:** La estructura lógica de los nodos y el contenido del archivo JSON para que pueda ser importado directamente en n8n.