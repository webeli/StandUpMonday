import { autorun, observable } from 'mobx';
import { fbAuth } from './Common/WebAPIUtils';

class GlobalStore {
  @observable user = {};
  @observable loggedIn = null;

  checkAuth() {
    fbAuth.onAuthStateChanged((user) => {
      console.log('user', user)
      if (user) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    });
  }

  signIn(email, password) {
    //console.log(email, password);
    fbAuth.signInWithEmailAndPassword(email, password).then((success) => {
      this.loggedIn = true;
    }).catch(function (error) {
      console.error('ERROR: ', error);
    })
  }

  signOut() {
    fbAuth.signOut();
  }
}

let store = window.store = new GlobalStore();

export default store;

autorun(() => {
  //console.log(store.user);
})