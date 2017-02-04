import React, { Component } from 'react';
import RoomStore from './Room.Store';

class Room extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    RoomStore.loadRoom(props.params.id);
  }
  
  render() {
    return (
      <div>Room</div>
    );
  }
}

export default Room;