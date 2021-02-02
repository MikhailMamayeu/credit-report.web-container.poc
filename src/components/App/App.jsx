import React from 'react';

import MicroFrontend from '../MicroFrontend';

import microFrontends from '../../config/micro-frontends';

import './App.css';

const App = () => (
  <>
    <header className="app__header">
      <h1>Credit Report Web Container</h1>
    </header>
    <main>
      <section id={`${microFrontends.registration.name}-container`}>
        <MicroFrontend config={microFrontends.registration} />
      </section>
      <section id={`${microFrontends.summaryReport.name}-container`}>
        <MicroFrontend config={microFrontends.summaryReport} />
      </section>
    </main>
  </>
);

export default App;
