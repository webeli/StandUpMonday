import { autorun, observable } from 'mobx';
import { dbRoom } from '../Common/WebAPIUtils';
import { browserHistory } from 'react-router';

class StartStore {
    @observable roomName = '';
    @observable notFoundMessage = false;

    roomExists(roomName) {
        dbRoom.child(roomName).once('value', (snap) => {
            if (snap.exists()) {
                browserHistory.push(`/room/${roomName}`);
            } else {
                this.notFoundMessage = true;
            }
        })
    }
    createRoom(roomName) {
        dbRoom.child(roomName).set({name: roomName});
        browserHistory.push(`/room/${roomName}`);
    }
}

var store = window.store = new StartStore();

export default store;

autorun(() => {
    //console.log(store.roomName);
});