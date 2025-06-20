FROM node:20.11.1-alpine

WORKDIR /app
COPY . .

RUN npm install --production

EXPOSE 3000
CMD ["node", "server.js"]
