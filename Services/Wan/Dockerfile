FROM python:3.12-alpine

ENV TZ=America/Santiago

WORKDIR /app

COPY . .

RUN apk update && \
    apk upgrade && \
    pip install --upgrade pip && \
    pip install -r requirements.services.txt

CMD ["python", "main.py"]
