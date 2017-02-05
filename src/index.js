import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import 'antd/dist/antd.css';

import GlobalStore from './Global.Store';
import RoomStore from './Room/Room.Store';
import StartStore from './Start/Start.Store';
import { Provider } from 'mobx-react';

import Styletron from 'styletron-client';
import { StyletronProvider } from 'styletron-react';

const styleSheet = document.createElement('style');
document.head.appendChild(styleSheet);
const styletron = new Styletron([styleSheet]);

const stores = {
  globalStore: GlobalStore,
  startStore: StartStore,
  roomStore: RoomStore
};

ReactDOM.render(
  <Provider {...stores}>
    <StyletronProvider styletron={styletron}>
      <App />
    </StyletronProvider>
  </Provider>,
  document.getElementById('root')
);