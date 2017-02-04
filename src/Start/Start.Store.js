import {autorun, observable} from 'mobx';

class StartStore {
    @observable teamName = '';
    @observable teamFound = false;
}

var store = window.store = new StartStore();

export default store;

autorun(() => {
    console.log(store.teamName);
});