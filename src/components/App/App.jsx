import React from 'react';

import microFrontends from '../../config/micro-frontends';

import useMicroFrontend from '../../hooks/useMicroFrontend';

import './App.css';

const App = () => {
  useMicroFrontend(microFrontends.registration);
  useMicroFrontend(microFrontends.summaryReport);

  return (
    <>
      <header className="app__header">
        <h1>Credit Report Web Container</h1>
      </header>
      <main>
        <section id={`${microFrontends.registration.name}-container`} />
        <section id={`${microFrontends.summaryReport.name}-container`} />
      </main>
    </>
  );
};

export default App;
