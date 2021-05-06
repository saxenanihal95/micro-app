import * as React from 'react';
import * as ReactDOM from 'react-dom';
 
import App from './App';
 
const title = 'React with Webpack and Babel';
 
ReactDOM.render(
  <App title={title} />,
  document.getElementById('app')
);

// @ts-ignore
module.hot.accept();