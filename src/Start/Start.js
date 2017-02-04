import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject ('globalStore', 'startStore')
@observer
export default class Start extends Component {
  findRoom(e) {
    e.preventDefault();
    this.props.startStore.roomExists(this.props.startStore.roomName);
  }
  createRoom(e) {
    if (e) { e.preventDefault(); }
    this.props.startStore.createRoom(this.props.startStore.roomName);
  }
  handleChangeInput(e) {
    this.props.startStore.roomName = e.target.value;
    this.props.startStore.notFoundMessage = false;
  }
  render() {
    return (
      <div>
        <h1>Enter Room</h1>
        <form onSubmit={(e) => this.findRoom(e)}>
          <input
            value={this.props.startStore.roomName}
            onChange={(e) => this.handleChangeInput(e)}
            type="text"
            required />
          <button type="submit">Enter</button>
        </form>
        {this.props.startStore.notFoundMessage &&
          <p>This room does not exist <button onClick={() => this.createRoom()}>Create</button></p>}
        <h1>Create Room</h1>
        <form onSubmit={(e) => this.createRoom(e)}>
          <input
            value={this.props.startStore.roomName}
            onChange={(e) => this.handleChangeInput(e)}
            className="newRoomText"
            type="text"
            required />
          <button type="submit">Create</button>
        </form>
      </div>
    );
  }
}