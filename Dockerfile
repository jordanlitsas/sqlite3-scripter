FROM node:10-alpine

WORKDIR /app

COPY . . 

EXPOSE 8080

RUN npm install

CMD ["node", "server.js"]