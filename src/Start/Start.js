import React, { Component } from 'react';
import { observer } from 'mobx-react';
import StartStore from './Start.Store';

const styles = {
  row: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    padding: 5,
    borderRadius: 5,
    border: '1px solid #CCC',
    marginRight: 5,
  },
  button: {
    padding: 5,
    borderRadius: 5,
    background: '#FFF',
    border: '1px solid #CCC',
  }
}

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
  handleChangeInput(e) {
    StartStore.roomName = e.target.value;
    StartStore.notFoundMessage = false;
  }
  render() {
    return (
      <div style={styles.row}>
        <h1>Enter Room</h1>
        <form onSubmit={(e) => this.findRoom(e)}>
          <input
            style={styles.input}
            value={StartStore.roomName}
            onChange={(e) => this.handleChangeInput(e)}
            type="text"
            required />
          <button style={styles.button} type="submit">Enter</button>
        </form>
        {StartStore.notFoundMessage &&
          <p>This room does not exist <button style={styles.button} onClick={() => this.createRoom()}>Create</button></p>}
        <h1>Create Room</h1>
        <form onSubmit={(e) => this.createRoom(e)}>
          <input
            style={styles.input}
            value={StartStore.roomName}
            onChange={(e) => this.handleChangeInput(e)}
            className="newRoomText"
            type="text"
            required />
          <button style={styles.button} type="submit">Create</button>
        </form>
      </div>
    );
  }
}