import { observable } from 'mobx';
import { dbRoom } from '../Common/WebAPIUtils';
import { browserHistory } from 'react-router';

class StartStore {
    @observable roomName = '';
    @observable notFoundMessage = false;

    roomExists(roomName) {
        const name = roomName.toLowerCase();
        dbRoom.child(name).once('value', (snap) => {
            if (snap.exists()) {
                browserHistory.push(`/room/${name}`);
            } else {
                this.notFoundMessage = true;
            }
        })
    }
    createRoom(roomName) {
        const name = roomName.toLowerCase();
        dbRoom.child(name).set({name: name});
        browserHistory.push(`/room/${name}`);
    }
}

let store = new StartStore();

export default store;