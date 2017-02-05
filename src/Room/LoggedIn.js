import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { getToday } from './Room.Store';

import { Button, Badge } from 'antd';


const styles = {
  row: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '15px'
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
    props.roomStore.onAttendee(this.props.globalStore.user);
  }

  standingUp() {
    this.props.roomStore.standingUp(this.props.globalStore.user);
  }

  sittingDown() {
    this.props.roomStore.sittingDown(this.props.globalStore.user);
  }

  render() {
    const attendees = this.props.roomStore.attendees || null;

    let total = 0;
    const mappedAttendees = attendees && Object.keys(attendees).map((key) => {

      const isStanding = (attendees[key].standingDate === getToday() && attendees[key].sittingDate !== getToday());
      total = isStanding ? total+1 : total;

      return (
        <li key={key}>
          <Badge status={isStanding ? "success" : "error"} />
          <span className="head-example">{attendees[key].displayName}</span>
        </li>
      );
    });

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
            <Button type="primary" onClick={() => this.standingUp()}>I'M STANDING!</Button>}

          {this.props.roomStore.standingDate === getToday() && this.props.roomStore.sittingDate !== getToday() &&
            <Button type="danger" size="large" onClick={() => this.sittingDown()}>I'M SITTING!</Button>}

          {this.props.roomStore.standingDate === getToday() && this.props.roomStore.sittingDate === getToday() &&
            <p>Good work today!</p>}
        </div>
        <div>
            {total} Players left
        </div>
      </div>
    );
  }
}

export default LoggedIn;