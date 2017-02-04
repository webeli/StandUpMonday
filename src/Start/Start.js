import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { observer } from 'mobx-react';
import StartStore from './Start.Store';

@observer
export default class Start extends Component {
  findRoom() {
    const value = document.querySelector('.roomText').value;
    //TODO: validate against Firebase
    if (value === "1") {
      StartStore.teamFound = true;
    }
    //browserHistory.push(`/team/${value}`);
  }
  createRoom() {

  }
  render() {
    console.log(StartStore.teamFound,'store');
    return (
      <div>
        <h1>Enter room</h1>
        <input className="roomText" type="text" />
        <button onClick={() => this.findRoom()}>Go</button>
        {StartStore.teamFound && <p>This room does not exist <button onClick={() => console.log("create...")}>Create</button></p>}
        <h1>Create new room</h1>
        <input className="newRoomText" type="text" />
        <button>Go</button>
      </div>
    );
  }
}
