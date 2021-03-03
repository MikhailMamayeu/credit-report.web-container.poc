const getPublicPath = (hostType, microFrontend) => {
  switch (hostType) {
    case 's3':
      return `/v1/${microFrontend.page}`;
    case 'nginx':
      return `https://s3-eu-west-1.amazonaws.com/credit-report-s3-poc.test.ctmers.io/v2/${microFrontend.page}`;
    default:
      return `https://credit-report-${microFrontend.page}-poc.dev.ctmers.io:${microFrontend.port}`;
  }
};

export default {
  registration: {
    name: 'credit-report.registration-poc',
    // eslint-disable-next-line no-undef
    host: getPublicPath(hostType, { page: 'registration', port: 3001 }),
    script: 'main.js',
    styles: 'main.css',
    render: 'renderRegistration',
    unmount: 'unmountRegistration',
  },
  summaryReport: {
    name: 'credit-report.summary-report-poc',
    // eslint-disable-next-line no-undef
    host: getPublicPath(hostType, { page: 'summary-report', port: 3002 }),
    script: 'main.js',
    styles: 'main.css',
    render: 'renderSummaryReport',
    unmount: 'unmountSummaryReport',
  },
};
