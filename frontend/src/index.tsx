import React from 'react';
import ReactDOM from 'react-dom';
import './sass/index.scss';
import App from './Components/App';
import { store } from './app/store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
