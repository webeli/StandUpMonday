import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

const styles = {
  standingButton: {
    height: 100,
    width: 100
  },
  row: {
    display: 'flex',
    justifyContent: 'space-around'
  },
}

@inject('globalStore', 'roomStore')
@observer
class LoggedIn extends Component {

  constructor(props) {
    super(props);
    props.roomStore.addToAttendees(this.props.globalStore.user);
  }

  setSelfToStand() {
    this.props.roomStore.setSelfToStand();
  }

  render() {
    return this.props.roomStore.roomFound && (
      <div style={styles.row}>
        <div>
          <ul>
            <li>sa</li>
          </ul>
        </div>
        
        <div>
          <div>
            00:00
          </div>
          <button style={styles.standingButton} onClick={() => this.setSelfToStand()}>I'm STANDING!</button>
        </div>

        <div>
          asd
        </div>
      </div>
    );
  }
}

export default LoggedIn;