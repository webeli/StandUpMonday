import { autorun, observable } from 'mobx';
import { browserHistory } from 'react-router';

class Store {
  @observable user = {};

  loadUser() {
  }
}

let store = window.store = new Store();

export default store;

autorun(() => {
    //console.log(store.user);
})