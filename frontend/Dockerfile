# syntax=docker/dockerfile:1.4
FROM node:14 AS development

ENV CI=true
ENV PORT=3000

WORKDIR /usr/src/app
COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json

RUN npm install
COPY . /usr/src/app

CMD [ "npm", "run", "start" ]

FROM development AS builder

RUN npm run build

FROM nginx:1.13-alpine

COPY --from=builder /code/build /usr/share/nginx/html