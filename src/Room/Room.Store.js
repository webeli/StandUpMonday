import { observable } from 'mobx';
import { dbRoom } from '../Common/WebAPIUtils';
import { browserHistory } from 'react-router';

class RoomStore {
  @observable roomName = '';
  @observable roomFound = false;
  @observable attendees = [];

  checkRoom(roomName) {
    dbRoom.child(roomName).once('value', (snap) => {
      if (snap.exists()) {
        this.roomName = roomName;
        this.roomFound = true;
      } else {
        browserHistory.push(`/`);
      }
    });
  }

  addToAttendees(user) {
    const myUser = {
      displayName: user.displayName ? user.displayName : user.email,
      //date: Date.now(),
      isStanding: false
    }

    dbRoom.child(this.roomName).child("attendees").child(user.uid).set(myUser);
  }

  onAttendees() {
    dbRoom.child(this.roomName).child("attendees").on("child_added", (snap) => {
      this.attendees.push({key: snap.key, value: snap.val()});  
    });
  }
}

let store = new RoomStore();

export default store;