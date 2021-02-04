import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { App as MeerstrapApp, Footer } from '@meerstrap/components';
import { Header } from '@meerstrap/meerkit';

import MicroFrontend from '../MicroFrontend';

import microFrontends from '../../config/micro-frontends';

const App = () => (
  <MeerstrapApp>
    <Header
      subdomain={
        <>
          <strong>credit-report.</strong>web-container
        </>
      }
      myAccount
    />
    <Router>
      <Route path="/summary-report">
        <MicroFrontend microFrontend={microFrontends.summaryReport} />
      </Route>
      <Route path="/">
        <MicroFrontend microFrontend={microFrontends.registration} />
      </Route>
    </Router>
    <Footer>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus quis,
      magnam in hic consequuntur nulla consequatur. Voluptatem ratione
      recusandae maiores velit voluptates, dignissimos autem sequi magni saepe
      quisquam libero perspiciatis.
    </Footer>
  </MeerstrapApp>
);

export default App;
