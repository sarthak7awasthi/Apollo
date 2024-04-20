

# Python setup
FROM python:latest
WORKDIR /app
COPY --from=backend_build /app/backend .
RUN apt-get update && apt-get install -y python3 python3-pip && \
    python3 -m pip install --upgrade pip
COPY ./requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt



# Backend build
FROM node:latest as backend_build
WORKDIR /app/backend
RUN ls
COPY ./package*.json ./
RUN npm install
COPY ./ .
EXPOSE 8000
CMD ["npm", "start"]