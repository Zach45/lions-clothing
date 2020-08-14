import firebase, { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAtpwVNre8TH3GeyAmPpd2evAysjfMgR9k",
    authDomain: "lions-gear.firebaseapp.com",
    databaseURL: "https://lions-gear.firebaseio.com",
    projectId: "lions-gear",
    storageBucket: "lions-gear.appspot.com",
    messagingSenderId: "305618165271",
    appId: "1:305618165271:web:219ec8032d9951fc9c8652",
    measurementId: "G-6ZW87C6KDM"
};

firebase.initializeApp (config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;