FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production && npm cache clean --force

COPY . .

RUN npm install -g typescript && npm run build

EXPOSE 8080

CMD ["node", "dist/index.js"]
