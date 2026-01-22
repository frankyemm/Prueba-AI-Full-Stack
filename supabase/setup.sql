-- AI-Powered Support Co-Pilot - Database Setup Script
-- Expert PostgreSQL & Supabase Database Architecture

-- 1. Definición de Tipos ENUM
-- Asegura la integridad de los datos para categorías y sentimientos
CREATE TYPE ticket_category AS ENUM ('Técnico', 'Facturación', 'Comercial');
CREATE TYPE ticket_sentiment AS ENUM ('Positivo', 'Neutral', 'Negativo');

-- 2. Creación de Tabla tickets
-- Estructura principal para el almacenamiento de tickets
CREATE TABLE IF NOT EXISTS tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    description TEXT NOT NULL,
    category ticket_category, -- Nulo hasta procesamiento IA
    sentiment ticket_sentiment, -- Nulo hasta procesamiento IA
    processed BOOLEAN DEFAULT false
);

-- 3. Seguridad (Row Level Security - RLS)
-- Habilitar RLS en la tabla
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;

-- Política de Lectura (SELECT): Solo usuarios autenticados pueden ver los tickets (Dashboard)
-- Esto protege la información privada de los clientes.
CREATE POLICY "Allow authenticated read access" 
ON tickets FOR SELECT 
TO authenticated 
USING (true);

-- Política de Inserción (INSERT): Permitir a usuarios anónimos enviar tickets
-- Limitado a inserción para evitar que alguien con la anon_key lea la DB.
CREATE POLICY "Allow anonymous/authenticated inserts" 
ON tickets FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

-- Política de Actualización (UPDATE): DESHABILITADA PARA ROLES PÚBLICOS
-- Seguridad Crítica: El servicio de procesamiento (Python/IA) debe usar la 'service_role_key'
-- para realizar actualizaciones. Esa clave se salta el RLS y es 100% segura.
-- No se crean políticas de UPDATE aquí por seguridad.

-- 4. Tiempo Real (Realtime)
-- Añadir la tabla a la publicación de Supabase Realtime para suscripciones en el frontend
BEGIN;
  DROP PUBLICATION IF EXISTS supabase_realtime;
  CREATE PUBLICATION supabase_realtime FOR TABLE tickets;
COMMIT;
-- Alternativa si la publicación ya existe:
-- ALTER PUBLICATION supabase_realtime ADD TABLE tickets;
