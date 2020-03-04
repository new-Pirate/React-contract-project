import React from 'react';
import ReactDOM from 'react-dom';

import App from './containers/App';

import './normalize.css';
import 'antd/dist/antd.css';
import './main.css';

const rootEl = document.getElementById('app');
ReactDOM.render(<App />, rootEl);
