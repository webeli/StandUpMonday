import React, { Component } from 'react';
import { observer } from 'mobx-react';
import StartStore from './Start.Store';

import { styled } from 'styletron-react';

const Row = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const Input = styled('input', {
  padding: '5px',
  borderRadius: '5px',
  border: '1px solid #CCC',
  marginRight: '5px',
});

const Button = styled('button', {
  padding: '5px',
  borderRadius: '5px',
  background: '#FFF',
  border: '1px solid #CCC',
});

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
      <Row>
        <h1>Enter Room</h1>
        <form onSubmit={(e) => this.findRoom(e)}>
          <Input
            value={StartStore.roomName}
            onChange={(e) => this.handleInputChange(e)}
            type="text"
            required />
          <Button type="submit">Enter</Button>
        </form>
        {StartStore.notFoundMessage &&
          <p>This room does not exist <Button onClick={() => this.createRoom()}>Create</Button></p>}
        <h1>Create Room</h1>
        <form onSubmit={(e) => this.createRoom(e)}>
          <Input
            value={StartStore.roomName}
            onChange={(e) => this.handleInputChange(e)}
            className="newRoomText"
            type="text"
            required />
          <Button type="submit">Create</Button>
        </form>
      </Row>
    );
  }
}