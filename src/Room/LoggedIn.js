import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { getToday } from './Room.Store';
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

  standingUp() {
    this.props.roomStore.standingUp(this.props.globalStore.user);
  }

  sittingDown() {
    this.props.roomStore.sittingDown(this.props.globalStore.user);
  }

  render() {

    const attendees = this.props.roomStore.attendees;
    
    const mappedAttendees = Object.keys(attendees).map((key) => {
      return (
        <li key={key}>
          {(attendees[key].standingDate === getToday() && attendees[key].sittingDate !== getToday()) ? "(grön)" : "(röd)"} - {attendees[key].displayName}
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
          {this.props.roomStore.standingDate !== getToday() &&
            <button style={styles.button} onClick={() => this.standingUp()}>I'M STANDING!</button>}

          {this.props.roomStore.standingDate === getToday() && this.props.roomStore.sittingDate !== getToday() &&
            <button style={styles.button} onClick={() => this.sittingDown()}>I'M SITTING!</button>}

          {this.props.roomStore.standingDate === getToday() && this.props.roomStore.sittingDate === getToday() &&
            <p>Good work today!</p>}
        </div>
        <div>
          asd
        </div>
      </div>
    );
  }
}

export default LoggedIn;