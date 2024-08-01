FROM node:20 AS base

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

FROM base AS development

EXPOSE 3000

CMD ["npm", "start"]

FROM base AS production

RUN npm run build

FROM nginx:alpine

COPY --from=production /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
