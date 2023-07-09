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

WORKDIR /usr/src/app

RUN npm run build

FROM nginx:1.13-alpine

RUN groupadd -r user && useradd -r -g user osirius
RUN mkdir /home/osirius && chown osirius:user -R /home/osirius && chmod 777 -R /usr/src/app

USER osirius

COPY --from=builder /usr/src/app/build /usr/share/nginx/html