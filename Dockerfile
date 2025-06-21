FROM node:20.11.1

WORKDIR /app
COPY . .

RUN npm ci --omit=dev

EXPOSE 3000
CMD ["node", "server.js"]
