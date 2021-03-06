import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import './index.css';
import store from "./store";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route} from 'react-router-dom';
import { LocationProvider } from 'react-location';
import { QueryParamProvider } from 'use-query-params';

ReactDOM.render(
      <BrowserRouter>
        <Provider store={store}>
            <QueryParamProvider ReactRouterRoute={Route}>
              <App />
            </QueryParamProvider>
        </Provider>
      </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
