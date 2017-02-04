import { observable } from 'mobx';
// import { dbRoom } from '../Common/WebAPIUtils';
// import { browserHistory } from 'react-router';

class RoomStore {
  @observable roomName = '';
  @observable attendees = [];


  loadRoom(roomName) {
    //is user logged in?
    //console.log("a", roomName);
  }
}

let store = new RoomStore();

export default store;