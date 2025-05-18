# Gunakan Python image
FROM python:3.10-slim

# Set workdir
WORKDIR /app

# Salin file proyek
COPY . .

# Install dependency
RUN pip install --no-cache-dir -r requirements.txt

# Expose port Flask
EXPOSE 5000

# Jalankan aplikasi
CMD ["python", "app.py"]
