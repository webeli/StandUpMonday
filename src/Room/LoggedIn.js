import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

const styles = {
  row: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  input: {
    padding: 5,
    borderRadius: 5,
    border: '1px solid #CCC',
    marginRight: 5,
  },
  button: {
    padding: 15,
    borderRadius: 5,
    background: '#FFF',
    border: '1px solid #CCC',
  }
}

@inject('globalStore', 'roomStore')
@observer
class LoggedIn extends Component {

  constructor(props) {
    super(props);
    props.roomStore.addToAttendees(this.props.globalStore.user);
    props.roomStore.onAttendees();
  }

  setSelfToStand() {
    this.props.roomStore.setSelfToStand(this.props.globalStore.user);
  }

  render() {

    const mappedAttendees = this.props.roomStore.attendees.map((attendee) => {
      return (
        <li key={attendee.key}>
          {attendee.value.displayName}
        </li>
      );
    })

    return this.props.roomStore.roomFound && (
      <div style={styles.row}>
        <div>
          <ul>
            {mappedAttendees}
          </ul>
        </div>
        <div>
          <div>
            00:00
          </div>
          <button style={styles.button} onClick={() => this.setSelfToStand()}>I'm STANDING!</button>
        </div>
        <div>
          asd
        </div>
      </div>
    );
  }
}

export default LoggedIn;