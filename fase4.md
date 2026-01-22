**Actúa como un Senior Frontend Engineer experto en React 18, TypeScript y Tailwind CSS.**
**Contexto:** Estoy finalizando el "AI-Powered Support Co-Pilot" para una prueba técnica. Necesito un dashboard que muestre los tickets de soporte en tiempo real.
**Tarea:** Desarrolla el código para una aplicación de una sola página (SPA) con las siguientes especificaciones:
1. **Configuración Técnica:**
* Utiliza **Vite** como bundler y **TypeScript** para el tipado.
* Instala y configura el cliente de **Supabase** (`@supabase/supabase-js`).
* Usa **Tailwind CSS** para un diseño moderno, limpio y profesional.
 
 
2. **Funcionalidad Principal:**
* **Fetch Inicial:** Al cargar la página, debe traer todos los tickets existentes ordenados por `created_at` (descendente).
* **Suscripción Realtime:** Implementa `supabase.channel().on('postgres_changes', ...)` para escuchar inserciones y actualizaciones en la tabla `tickets`. La lista debe actualizarse automáticamente sin necesidad de recargar el navegador.
 
 
3. **Interfaz de Usuario (UI):**
* Crea un layout con un encabezado profesional y una cuadrícula (grid) o lista de tarjetas (cards).
* Cada tarjeta de ticket debe mostrar: ID, descripción, categoría, sentimiento y un indicador visual de si está "Procesado" o "Pendiente".
* **Estilizado Condicional:**          - Categorías: Diferentes colores de fondo (ej: Azul para Técnico, Verde para Comercial).
* Sentimiento: Badges con colores semánticos (Rojo para Negativo, Amarillo para Neutral, Verde para Positivo).
* Estado: Un ícono de "check" si `processed` es true.
 
 
 
 
4. **Calidad del Código:**
* Maneja estados de carga (`loading`) y error.
* Organiza el código en componentes limpios (ej: `TicketCard`, `TicketList`).
* Usa Hooks (`useEffect`, `useState`) de forma eficiente.
 
 
**Entregable:** Proporciona el código de `App.tsx`, la configuración del cliente de Supabase y los componentes necesarios, además de las instrucciones para configurar las variables de entorno (`VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`).

---

### **Puntos clave para tu evaluación:**

* **Realtime:** Asegúrate de que, al insertar un ticket manualmente en el dashboard de Supabase (o vía n8n), este aparezca inmediatamente en tu frontend. Esto garantiza el punto de **"Funcionalidad End-to-End"**.
* **Diseño:** Al usar Tailwind, asegúrate de que sea responsive. Un dashboard que se ve bien en móvil y escritorio suma muchos puntos en la categoría de **"Dominio de Ecosistema"**.
* **Tipado:** Al usar TypeScript, define una `interface Ticket` que coincida con tu esquema SQL de la Fase 1.
