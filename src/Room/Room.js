import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import LoggedIn from './LoggedIn';
import NotLoggedIn from './NotLoggedIn';

@inject ('globalStore', 'roomStore')
@observer
class Room extends Component {
  constructor(props) {
    super(props);
    props.globalStore.checkAuth();
  }
  
  render() {
    return this.props.globalStore.loggedIn !== null && (
      <div>
        { this.props.globalStore.loggedIn ? <LoggedIn /> : <NotLoggedIn /> }
      </div>
    );
  }
}

export default Room;