import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import { Layout } from 'antd';
const { Header, Footer, Content } = Layout;

import LoggedIn from './LoggedIn';
import NotLoggedIn from './NotLoggedIn';

@inject('globalStore', 'roomStore')
@observer
class Room extends Component {

  constructor(props) {
    super(props);
    props.globalStore.checkAuth();
  }

  componentWillMount() {
    const id = this.props.params.id;
    this.props.roomStore.checkRoom(id);
  }

  render() {
    return this.props.globalStore.loggedIn !== null && this.props.roomStore.roomFound && (
      <Layout style={{ minHeight: '100vh' }}>
        <Header></Header>
        <Content>
          {this.props.globalStore.loggedIn ? <LoggedIn /> : <NotLoggedIn />}
        </Content>
        <Footer></Footer>
      </Layout>
    );
  }
}

export default Room;