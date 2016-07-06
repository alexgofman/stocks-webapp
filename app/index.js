import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import reducers from './reducers';
import Home from './components/home';

import createSocketIoMiddleware from 'redux-socket.io';

import io from 'socket.io-client';
const socket = io('https://stocks-webapp.herokuapp.com');
const socketIoMiddleWare = createSocketIoMiddleware(socket, 'server/');

const store = applyMiddleware(socketIoMiddleWare)(createStore)(reducers);

ReactDOM.render(
  <Provider store={store}>
    <Home/>
  </Provider>
  , document.querySelector('.app'));