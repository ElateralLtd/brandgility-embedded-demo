import React from 'react';
import { render } from 'react-dom';

import 'core/polyfill';

import './index.css';
import App from './app';

const root = document.querySelector('#root');

render(<App />, root);
