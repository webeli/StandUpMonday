import React, { Component } from 'react';
import { observer } from 'mobx-react';
import StartStore from './Start.Store';

import { Button, Col, Layout, Input, Form } from 'antd';
const { Header, Footer, Content } = Layout;

@observer
export default class Start extends Component {
  findRoom(e) {
    e.preventDefault();
    StartStore.roomExists(StartStore.roomName);
  }
  createRoom(e) {
    if (e) {
      e.preventDefault();
    }
    StartStore.createRoom(StartStore.roomName);
  }
  handleInputChange(e) {
    StartStore.roomName = e.target.value;
    StartStore.notFoundMessage = false;
  }
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header></Header>
        <Content>
          <Col offset={8} span={8} style={{ marginTop: '20px', textAlign:'center' }}>
            <h1>Enter Room</h1>
            <Form inline onSubmit={(e) => this.findRoom(e)}>
              <Form.Item>
                <Input
                  value={StartStore.roomName}
                  onChange={(e) => this.handleInputChange(e)}
                  type="text"
                  required />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit">Enter</Button>
              </Form.Item>
            </Form>
            {StartStore.notFoundMessage &&
              <p style={{ marginTop:'10px' }}>This room does not exist <Button onClick={() => this.createRoom()}>Create</Button></p>}
            <h1>Create Room</h1>
            <Form inline onSubmit={(e) => this.createRoom(e)}>
              <Form.Item>
                <Input
                  value={StartStore.roomName}
                  onChange={(e) => this.handleInputChange(e)}
                  type="text"
                  required />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit">Create</Button>
              </Form.Item>
            </Form>
          </Col>
        </Content>
        <Footer></Footer>
      </Layout>
    );
  }
}