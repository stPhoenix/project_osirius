# syntax=docker/dockerfile:1.4
FROM node:16 AS development

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

FROM nginx:1.25.1

RUN chown -R nginx:nginx /var/cache/nginx && \
        chown -R nginx:nginx /var/log/nginx && \
        chown -R nginx:nginx /etc/nginx/conf.d
RUN touch /var/run/nginx.pid && \
        chown -R nginx:nginx /var/run/nginx.pid
USER nginx

COPY --from=builder /usr/src/app/build /usr/share/nginx/html