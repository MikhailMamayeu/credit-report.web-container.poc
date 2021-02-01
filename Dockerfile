FROM node:lts-alpine as builder

USER node

WORKDIR /usr/src/app

COPY --chown=node:node package*.json .

RUN npm install

COPY --chown=node:node . .

RUN npm run build

FROM nginx:stable-alpine

COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]
