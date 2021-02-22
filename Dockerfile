FROM node:lts-alpine as builder

RUN mkdir -p /usr/src/app && chown node:node /usr/src/app

RUN npm install -g npm@latest && npm cache clean --force

USER node

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

COPY --chown=node:node .npmrc ./

RUN npm install

COPY --chown=node:node . ./

RUN npm run build

FROM nginx:stable-alpine

RUN mkdir -p /var/www/credit-report-web-container-poc.dev.ctmers.io && chown nginx:nginx /var/www/credit-report-web-container-poc.dev.ctmers.io

COPY --from=builder --chown=nginx:nginx /usr/src/app/dist /var/www/credit-report-web-container-poc.dev.ctmers.io

COPY credit-report-web-container-poc.dev.ctmers.io.pem /etc/ssl/certs/credit-report-web-container-poc.dev.ctmers.io.pem

COPY credit-report-web-container-poc.dev.ctmers.io-key.pem /etc/ssl/private/credit-report-web-container-poc.dev.ctmers.io-key.pem

COPY nginx/self-signed.conf /etc/nginx/snippets/self-signed.conf

COPY nginx/ssl-params.conf /etc/nginx/snippets/ssl-params.conf

COPY nginx/credit-report-web-container-poc.dev.ctmers.io.conf /etc/nginx/conf.d/credit-report-web-container-poc.dev.ctmers.io.conf

COPY nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

EXPOSE 443

CMD [ "nginx", "-g", "daemon off;" ]
