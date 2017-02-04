import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import GlobalStore from './Global.Store';
import RoomStore from './Room/Room.Store';
import StartStore from './Start/Start.Store';
import { Provider } from 'mobx-react';

const stores = {
  globalStore: GlobalStore,
  startStore: StartStore,
  roomStore: RoomStore
};

ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById('root')
);
