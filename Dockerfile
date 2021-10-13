FROM node:14

WORKDIR /app

COPY . . 

EXPOSE 8080

RUN npm install

CMD ["node", "server.js"]