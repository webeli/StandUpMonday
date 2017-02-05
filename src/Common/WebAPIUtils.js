import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyCr_ugwfiUTMRNo4q85UxiQCe1Vw83-j2o",
    authDomain: "standupmonday.firebaseapp.com",
    databaseURL: "https://standupmonday.firebaseio.com",
    storageBucket: "standupmonday.appspot.com",
    messagingSenderId: "1079785500807"
};
firebase.initializeApp(config);

const db = firebase.database().ref();

const dbRoom = firebase.database().ref('room');

const fbAuth = firebase.auth();

export { db, dbRoom, fbAuth }