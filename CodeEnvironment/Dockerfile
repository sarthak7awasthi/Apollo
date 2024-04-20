FROM gcc:latest

# Install Python and pip
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-venv

# Set working directory
WORKDIR /CodeEnvironment

# Create a virtual environment
RUN python3 -m venv venv

# Activate the virtual environment
ENV PATH="/CodeEnvironment/venv/bin:$PATH"

# Copy requirements.txt and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the Flask server code into the container
COPY server.py .

# Expose the Flask port
EXPOSE 5000

# Command to run the Flask server
CMD ["python", "server.py"]
