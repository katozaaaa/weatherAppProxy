FROM node:20.11.1

WORKDIR /app
COPY . .

RUN npm install --production --verbose

EXPOSE 3000
CMD ["node", "server.js"]
