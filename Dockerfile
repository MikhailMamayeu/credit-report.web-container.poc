FROM node:lts-alpine as builder

RUN mkdir -p /usr/src/app && chown node:node /usr/src/app

USER node

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm install

COPY --chown=node:node . ./

RUN npm run build

FROM nginx:stable-alpine

RUN mkdir -p /var/www/localhost && chown nginx:nginx /var/www/localhost

COPY --from=builder --chown=nginx:nginx /usr/src/app/dist /var/www/localhost

COPY nginx/nginx.conf /etc/nginx/nginx.conf

COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]
