FROM node:20 AS base

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

FROM base AS development

RUN npm install -g nodemon

EXPOSE 3044

CMD ["npx", "nodemon", "src/index.ts"]

FROM base AS production

EXPOSE 3044

CMD ["npm", "start"]
