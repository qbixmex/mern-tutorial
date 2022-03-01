import React from 'react';
import ReactDOM from 'react-dom';
import './sass/index.scss';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './Components/App';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
