import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { getToday } from './Room.Store';

import { Button, Badge, Row, Col } from 'antd';

@inject('globalStore', 'roomStore', 'routing')
@observer
class LoggedIn extends Component {

  constructor(props) {
    super(props);
    props.roomStore.onAttendees(this.props.routing.location.pathname, this.props.roomStore.dateToday);
    props.roomStore.onAttendee(this.props.globalStore.user, this.props.routing.location.pathname);
  }

  standingUp() {
    this.props.roomStore.standingUp(this.props.globalStore.user, this.props.routing.location.pathname);
  }

  sittingDown() {
    this.props.roomStore.sittingDown(this.props.globalStore.user, this.props.routing.location.pathname);
  }

  render() {
    let attendees = this.props.roomStore.attendees;

    let total = 0;
    const mappedAttendees = attendees && Object.keys(attendees).map((key) => {

      const isStanding = (attendees[key].standingDate === getToday() && attendees[key].sittingDate !== getToday());
      total = isStanding ? total + 1 : total;

      return (
        <Col xs={{ span: 24 }} lg={{ span: 14, offset: 10 }} key={key} style={{ textAlign: 'left' }}>
          <Badge status={isStanding ? "success" : "error"} />
          <span className="head-example">{attendees[key].displayName}</span>
        </Col>
      );
    });

    return this.props.roomStore.roomFound && (
      <Row type="flex" justify="space-between" align="middle" style={{ textAlign: 'center', marginTop: '20px' }}>
        <Col xs={{ span: 14, offset: 8 }} lg={{ span: 8 }}>
          {mappedAttendees}
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          {this.props.roomStore.standingDate !== getToday() &&
            <Button type="primary" onClick={() => this.standingUp()}>I'M STANDING!</Button>}

          {this.props.roomStore.standingDate === getToday() && this.props.roomStore.sittingDate !== getToday() &&
            <Button type="danger" size="large" onClick={() => this.sittingDown()}>I'M SITTING!</Button>}

          {this.props.roomStore.standingDate === getToday() && this.props.roomStore.sittingDate === getToday() &&
            <p>Good work today!</p>}
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          {total} Attendees left
        </Col>
      </Row>
    );
  }
}

export default LoggedIn;