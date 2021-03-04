# Credit Report Web Container POC

The stitching layer to get [Credit Report Registration POC](https://github.com/MikhailMamayeu/credit-report.registration-poc) and [Credit Report Summary Report POC](https://github.com/MikhailMamayeu/credit-report.summary-report-poc) together

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development purpose

### Prerequisites

:loudspeaker: Make sure to have [Node.js](https://nodejs.org/en/) installed on your system

- Add the following line to the `hosts` file in order to avoid [the infamous CORS issue](https://comparethemarket.atlassian.net/wiki/spaces/MEER/pages/1907130737) when requesting CtM fonts

```
127.0.0.1 credit-report-web-container-poc.dev.ctmers.io
```

### Installing and running

- Run the install command to get the dependencies

```
npm install
```

:heavy_exclamation_mark: In order to get the whole Credit Report POC application together, you need to have [registration](https://github.com/MikhailMamayeu/credit-report.registration-poc) and [summary report](https://github.com/MikhailMamayeu/credit-report.summary-report-poc) up and running as well

- You are good to go to run your application locally

```
npm start
```

## Docker

If you want to serve the production bundle over a web server, then feel free to use [Docker](https://www.docker.com/) with [NGINX](https://nginx.org/)

### Prerequisites

:warning: The following steps are required to get NGINX over HTTPS using a **trusted** self-signed certificate

- Get [`mkcert`](https://github.com/FiloSottile/mkcert) on your machine

- Create a new local CA by executing the following command

```
mkcert -install
```

- Generate a self-signed certificate for `credit-report-web-container-poc.dev.ctmers.io` by running the below command from **the root of the project**

```
mkcert credit-report-web-container-poc.dev.ctmers.io
```

- Build the image

```
docker build -t credit-report.web-container-poc -f Dockerfile.dev .
```

- Serve the bundle over NGINX inside Docker

```
docker run -dp 2000:80 -p 3000:443 credit-report.web-container-poc
```

## Performance and bundle weight

:eyes: The below results are based on the locally available application served over NGINX with self-signed SSL certificate

[Web performance](https://s3-eu-west-1.amazonaws.com/credit-report-s3-poc.test.ctmers.io/sitespeed-result/module-federation/index.html)

[Bundle size](https://ja2r7.app.goo.gl/6UBxwSqVZVAqqybU8)
