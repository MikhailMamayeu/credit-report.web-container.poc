import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  useHistory,
} from 'react-router-dom';
import { App as MeerstrapApp, Footer } from '@meerstrap/components';
import { Header } from '@meerstrap/meerkit';

// eslint-disable-next-line import/no-unresolved
import Registration from 'registration/App';
// eslint-disable-next-line import/no-unresolved
import SummaryReport from 'summaryReport/App';

const Routes = () => {
  const history = useHistory();

  return (
    <>
      <Route path="/registration">
        <Registration history={history} />
      </Route>
      <Route path="/summary-report">
        <SummaryReport history={history} />
      </Route>
      <Route exact path="/">
        <Redirect to="/registration" />
      </Route>
    </>
  );
};

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
      <Routes />
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
