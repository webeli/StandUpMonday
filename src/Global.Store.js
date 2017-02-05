import { autorun, observable } from 'mobx';
import { fbAuth } from './Common/WebAPIUtils';

class GlobalStore {
  @observable user = {};
  @observable loggedIn = null;

  checkAuth() {
    fbAuth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    });
  }

  signIn(email, password) {
    fbAuth.signInWithEmailAndPassword(email, password).then((success) => {

    }).catch(function (error) {
      console.error('ERROR: ', error);
    })
  }

  createUser(newUser) {
    fbAuth.createUserWithEmailAndPassword(newUser.email, newUser.password).then((user) => {
      user.updateProfile({
        displayName: newUser.displayName,
        photoURL: "http://www.themediaant.com/images/icon-profile.png"
      })
    }).catch((error) => {
      console.log('ERROR: ', error);
    });
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