FROM node:18-alpine

WORKDIR /app

COPY . .

EXPOSE 3000

RUN npm install

CMD ["npm", "start"]

# The Dockerfile for the backend is very similar to the frontend Dockerfile.
# The main differences are the exposed port and the command to start the server.
