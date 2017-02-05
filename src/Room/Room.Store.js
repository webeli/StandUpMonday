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
  @observable standingDate;
  @observable sittingDate;

  @observable roomName = ''; // Try not to use in Store Methods, sometimes doesn't seem to get in sync on room changes (use prop from component instead).
  @observable roomFound = false;
  @observable attendees = null;
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

  addToAttendees(user, pathname) {
    db.child(pathname).child("attendees").child(user.uid).once("value", (snap) => {
      if (!snap.val()) {
        db.child(pathname).child("attendees").child(user.uid).set({
          displayName: user.displayName ? user.displayName : user.email
        });
      } else {
        this.standingDate = snap.val().standingDate;
        this.sittingDate = snap.val().sittingDate;
      }
    });
  }

  onAttendee(user, pathname) {
    db.child(pathname).child("attendees").child(user.uid).on("value", (attendee) => {
      if (attendee.val()) {
        this.standingDate = attendee.val().standingDate;
        this.sittingDate = attendee.val().sittingDate;
      } else {
        this.standingDate = null;
        this.sittingDate = null;
      }
    });
  }

  onAttendees(pathname, dateNow) {
    db.child(pathname).child("attendees")
    .orderByChild("standingDate")
    .equalTo(dateNow)
    .on("value", (snap) => {
      this.attendees = snap.val();
    });

    db.child(pathname).child("attendees").on("child_changed", (snap) => {
      // print out history
    })
  }

  sittingDown(user, pathname) {
    db.child(pathname).child("attendees").child(user.uid).update({ sittingDate: this.dateToday });
  }

  standingUp(user, pathname) {
    db.child(pathname).child("attendees").child(user.uid).update({ standingDate: this.dateToday });
  }
}

let store = window.roomStore = new RoomStore();

export default store;

autorun(() => {
  //console.log(store.attendees);
})