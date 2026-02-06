# Use Python 3.9 (Stable for TensorFlow)
FROM python:3.9

# Set working directory to /code
WORKDIR /code

# Copy the requirements file into the container
COPY ./requirements.txt /code/requirements.txt

# Install dependencies
# We increase timeout because TensorFlow is huge
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Copy the rest of the application
COPY . .

# Create the uploads folder and fix permissions (Important for HF)
RUN mkdir -p /code/uploads && chmod 777 /code/uploads

# Hugging Face expects the app to run on port 7860
CMD ["gunicorn", "-b", "0.0.0.0:7860", "app:app"]