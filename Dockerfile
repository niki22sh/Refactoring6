FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ../../Downloads/Refactoring6/project .

CMD ["node", "src/app.js"]
