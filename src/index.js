import './polyfills';
import React from 'react';
import { render } from 'react-dom';
import '@meerstrap/webui/lib/styles/base.css';

import App from './components/App';

render(<App />, document.getElementById('app'));
