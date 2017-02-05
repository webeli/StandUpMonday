import { observable } from 'mobx';
import { dbRoom } from '../Common/WebAPIUtils';
import { browserHistory } from 'react-router';

export function getToday() {
  const dateObj = new Date();
  const month = dateObj.getUTCMonth() + 1;
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  return year + "-" + month + "-" + day;
}

class RoomStore {
  @observable user;
  @observable standingDate;
  @observable sittingDate;

  @observable roomName = '';
  @observable roomFound = false;
  @observable attendees = {};
  @observable dateToday = getToday();

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
    dbRoom.child(this.roomName).child("attendees").child(user.uid).once("value", (snap) => {
      if (!snap.val()) {
        dbRoom.child(this.roomName).child("attendees").child(user.uid).set({
          displayName: user.displayName ? user.displayName : user.email
        });
      } else {
        this.standingDate = snap.val().standingDate;
        this.sittingDate = snap.val().sittingDate;
      }
    });
  }

  onAttendee(user) {
    dbRoom.child(this.roomName).child("attendees").child(user.uid).on("value", (attendee) => {
      this.standingDate = attendee.val().standingDate;
      this.sittingDate = attendee.val().sittingDate;
    });
  }

  onAttendees() {
    dbRoom.child(this.roomName).child("attendees")
      .orderByChild("standingDate").equalTo(this.dateToday)
      .on("value", (snap) => {
        this.attendees = snap.val();
      });

    dbRoom.child(this.roomName).child("attendees").on("child_changed", (snap) => {
      // print out history
    })
  }

  sittingDown(user) {
    dbRoom.child(this.roomName).child("attendees").child(user.uid).update({ sittingDate: this.dateToday });
  }

  standingUp(user) {
    dbRoom.child(this.roomName).child("attendees").child(user.uid).update({ standingDate: this.dateToday });
  }
}

let store = new RoomStore();

export default store;