import { observable, autorun } from 'mobx';
import { db, dbRoom } from '../Common/WebAPIUtils';
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
        console.log('this.roomName',this.roomName);
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
      if (attendee.val()) {
        this.standingDate = attendee.val().standingDate;
        this.sittingDate = attendee.val().sittingDate;
      }
    });
  }

  onAttendees(pathname) {
    console.log('pathname', pathname)
    db.child(pathname).child("attendees").on("value", (snap) => {
      console.log('onAttendees', snap.val());
        this.attendees = {};
        this.attendees = snap.val();
        console.log('this.attendees',this.attendees);
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

let store = window.roomStore = new RoomStore();

export default store;

autorun(() => {
  //console.log(store.attendees);
})