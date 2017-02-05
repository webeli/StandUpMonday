import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import ReactDOM from 'react-dom';

import 'antd/dist/antd.css';

import GlobalStore from './Global.Store';
import RoomStore from './Room/Room.Store';
import StartStore from './Start/Start.Store';
import { Provider } from 'mobx-react';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';

import Styletron from 'styletron-client';
import { StyletronProvider } from 'styletron-react';

import Start from './Start/Start';
import Room from './Room/Room';
import Profile from './Profile/Profile';

const styleSheet = document.createElement('style');
document.head.appendChild(styleSheet);
const styletron = new Styletron([styleSheet]);

const routingStore = new RouterStore();
const history = syncHistoryWithStore(browserHistory, routingStore);

const stores = {
  globalStore: GlobalStore,
  startStore: StartStore,
  roomStore: RoomStore,
  routing: routingStore
};

ReactDOM.render(
  <Provider {...stores}>
    <StyletronProvider styletron={styletron}>
      <Router history={history}>
        <Route path='/' component={Start} />
        <Route path='room/:id' component={Room} />
        <Route path='profile' component={Profile} />
      </Router>
    </StyletronProvider>
  </Provider>,
  document.getElementById('root')
);