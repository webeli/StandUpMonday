import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { getToday } from './Room.Store';

import { Button, Badge, Row, Col, Layout } from 'antd';
const { Header, Footer, Content } = Layout;

@inject('globalStore', 'roomStore', 'routing')
@observer
class LoggedIn extends Component {

  constructor(props) {
    super(props);
    props.roomStore.addToAttendees(this.props.globalStore.user, this.props.routing.location.pathname);
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
        <Col span={14} offset={10} key={key} style={{textAlign: 'left'}}>
          <Badge status={isStanding ? "success" : "error"} />
          <span className="head-example">{attendees[key].displayName}</span>
        </Col>
      );
    });

    return this.props.roomStore.roomFound && (
      <Layout style={{minHeight: '100vh'}}>
        <Header></Header>
        <Content>
          <Row type="flex" justify="space-between" align="middle" style={{textAlign: 'center', marginTop:'20px'}}>
            <Col span={8}>
              {mappedAttendees}
            </Col>
            <Col span={8}>
              {this.props.roomStore.standingDate !== getToday() &&
                <Button type="primary" onClick={() => this.standingUp()}>I'M STANDING!</Button>}

              {this.props.roomStore.standingDate === getToday() && this.props.roomStore.sittingDate !== getToday() &&
                <Button type="danger" size="large" onClick={() => this.sittingDown()}>I'M SITTING!</Button>}

              {this.props.roomStore.standingDate === getToday() && this.props.roomStore.sittingDate === getToday() &&
                <p>Good work today!</p>}
            </Col>
            <Col span={8}>
              {total} Attendees left
            </Col>
          </Row>
        </Content>
        <Footer></Footer>
      </Layout>
    );
  }
}

export default LoggedIn;