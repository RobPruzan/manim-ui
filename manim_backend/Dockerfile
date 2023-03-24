# Use the official Python image as the base image
FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install required system packages
RUN apt-get update \
    && apt-get install -y build-essential python3-dev libcairo2-dev libpango1.0-dev ffmpeg texlive texlive-latex-extra\
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the Flask application files to the container
COPY app.py .

# Expose the port the Flask server will run on
EXPOSE 8000

# Start the Flask server with gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "app:app"]

