**Actúa como un Senior Database Architect experto en PostgreSQL y Supabase.**
**Contexto:** Estoy construyendo un "AI-Powered Support Co-Pilot". Necesito el archivo `setup.sql` para inicializar la base de datos en Supabase.
 
 
**Tarea:** Genera un script SQL profesional que realice lo siguiente:
1. **Definición de Tipos:** Crea dos tipos `ENUM` para asegurar la integridad de los datos:
- `ticket_category`: con los valores 'Técnico', 'Facturación', 'Comercial'.
- `ticket_sentiment`: con los valores 'Positivo', 'Neutral', 'Negativo'.
 
 
 
 
2. **Creación de Tabla:** Crea la tabla `tickets` con las siguientes especificaciones:
- `id`: UUID como Primary Key (por defecto `gen_random_uuid()`).
- `created_at`: Timestamp con zona horaria (por defecto `now()`).
- `description`: Texto no nulo para el contenido del ticket.
- `category`: Tipo `ticket_category` (puede ser nulo inicialmente hasta que la IA lo procese).
- `sentiment`: Tipo `ticket_sentiment` (puede ser nulo inicialmente).
- `processed`: Booleano con valor por defecto `false`.
 
 
3. **Seguridad (RLS):** 
 
* Habilita Row Level Security en la tabla `tickets`.
* Crea una política de **Lectura (SELECT)**: Permitir acceso de lectura a todos los usuarios (para el Dashboard).
* Crea una política de **Inserción (INSERT)**: Permitir inserciones anónimas o autenticadas (para recibir nuevos tickets).
* Crea una política de **Actualización (UPDATE)**: Permitir actualizaciones solo si el servicio está procesando el ticket (puedes simplificarlo permitiendo actualizaciones generales por ahora para facilitar la integración con la API de Python).
 
 
4. **Tiempo Real (Realtime):**
- Genera el comando para añadir la tabla `tickets` a la publicación `supabase_realtime` para permitir suscripciones en tiempo real desde el frontend.
 
 
**Entregable:** Un único bloque de código SQL limpio, comentado y listo para ejecutar en el editor de consultas de Supabase.
