import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Start from './Start/Start';
import Room from './Room/Room';
import Profile from './Profile/Profile';

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={Start} />
        <Route path='room/:id' component={Room} />
        <Route path='profile' component={Profile} />
      </Router>
    );
  }
}

export default App;
