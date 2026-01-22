# Usar una imagen base ligera de Python
FROM python:3.11-slim

# Establecer variables de entorno para evitar archivos .pyc y habilitar buffering de logs
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Directorio de trabajo
WORKDIR /app

# Instalar dependencias del sistema necesarias
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copiar requirements e instalar
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el código de la aplicación
COPY . .

# Exponer el puerto que usará FastAPI
EXPOSE 8000

# Comando para ejecutar la aplicación
# Usamos uvicorn para producción. 0.0.0.0 es necesario para Docker.
CMD ["uvicorn", "api.main:app", "--host", "0.0.0.0", "--port", "8000"]
