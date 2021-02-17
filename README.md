# Credit Report Web Container POC

The stitching layer to get [Credit Report Registration POC](https://github.com/MikhailMamayeu/credit-report.registration.poc) and [Credit Report Summary Report POC](https://github.com/MikhailMamayeu/credit-report.summary-report.poc) together

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development purpose

### Prerequisites

Make sure to have [Node.js](https://nodejs.org/en/) installed on your system

Add the following line to the `host` file in order to avoid [the infamous CORS issue](https://comparethemarket.atlassian.net/wiki/spaces/MEER/pages/1907130737) when requesting CtM fonts:

```
127.0.0.1 credit-report-web-container-poc.dev.ctmers.io
```

### Installing and running

Run the install command to get the dependencies

```
npm install
```

:heavy_exclamation_mark: In order to get the whole Credit Report POC application together, you need to have [registration](https://github.com/MikhailMamayeu/credit-report.registration.poc) and [summary report](https://github.com/MikhailMamayeu/credit-report.summary-report.poc) up and running as well

You are good to go to run your application locally

```
npm start
```

If you want to run production-like version of the app, then feel free to use [Docker](https://www.docker.com/)

Build the image

```
docker build -t credit-report.web-container.poc .
```

Serve the bundle over NGINX inside Docker

```
docker run -dp 3000:80 credit-report.web-container.poc
```

## Bundle size results

[Available here](https://ja2r7.app.goo.gl/E1jqHthi9oy256Wo8)
