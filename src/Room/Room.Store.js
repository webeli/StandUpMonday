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

export function getTimeStamp() {
  const dateObj = new Date();
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const seconds = dateObj.getSeconds();
  return `${hours}:${minutes}:${seconds}`;
}

class RoomStore {
  @observable standingDate;
  @observable sittingDate;

  @observable roomName = ''; // Try not to use in Store Methods, sometimes doesn't seem to get in sync on room changes (use prop from component instead).
  @observable roomFound = false;
  @observable attendees = null;
  @observable dateToday = getToday();

  @observable logs = [];

  @observable displayNewUserForm = false;

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
  }

  onLogs(pathname) {
    db.child(pathname).child("logs").child(this.dateToday).on("child_added", (log) => {
      this.logs.push({key: log.key, value: log.val()});
    });
  }

  sittingDown(user, pathname) {
    db.child(pathname).child("attendees").child(user.uid).update({ sittingDate: this.dateToday });
    
    const logMsg = {
      displayName: user.displayName ? user.displayName : user.email,
      body: "gave up at",
      timestamp: getTimeStamp()
    };

    db.child(pathname).child("logs").child(this.dateToday).push(logMsg);
  }

  standingUp(user, pathname) {
    db.child(pathname).child("attendees").child(user.uid).set({  
        displayName: user.displayName ? user.displayName : user.email,
        standingDate: this.dateToday  
    });
  }
}

let store = window.roomStore = new RoomStore();

export default store;

autorun(() => {
  //console.log(store.attendees);
})