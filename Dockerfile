FROM node:20.11.1

WORKDIR /app
COPY . .

RUN echo "nameserver 8.8.8.8" > /etc/resolv.conf && \
    echo "nameserver 8.8.4.4" >> /etc/resolv.conf

RUN npm install --production --verbose

EXPOSE 3000
CMD ["node", "server.js"]
