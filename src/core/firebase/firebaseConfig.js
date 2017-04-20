import firebase from 'firebase';

export const firebaseConfig = {
    apiKey: "AIzaSyB4_XKCJHjgSdDlPAB0yhVRJPvvEBr2Fr4",
    authDomain: "crud-app-e57b1.firebaseapp.com",
    databaseURL: "https://crud-app-e57b1.firebaseio.com",
    projectId: "crud-app-e57b1",
    storageBucket: "crud-app-e57b1.appspot.com",
    messagingSenderId: "1044880472697"
};


export const firebaseApp = firebase.initializeApp(firebaseConfig);

export const firebaseAuth = firebaseApp.auth();

export const firebaseDb = firebaseApp.database();

