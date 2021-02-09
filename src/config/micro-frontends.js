export default {
  registration: {
    name: 'credit-report.registration.poc',
    host:
      // eslint-disable-next-line no-undef
      environment === 'development'
        ? 'https://credit-report-registration-poc.dev.ctmers.io:3001'
        : 'http://127.0.0.1:3001',
    script: 'main.js',
    styles: 'main.css',
    render: 'renderRegistration',
    unmount: 'unmountRegistration',
  },
  summaryReport: {
    name: 'credit-report.summary-report.poc',
    host:
      // eslint-disable-next-line no-undef
      environment === 'development'
        ? 'https://credit-report-summary-report-poc.dev.ctmers.io:3002'
        : 'http://127.0.0.1:3002',
    script: 'main.js',
    styles: 'main.css',
    render: 'renderSummaryReport',
    unmount: 'unmountSummaryReport',
  },
};
