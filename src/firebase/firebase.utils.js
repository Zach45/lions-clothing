import firebase from 'firebase/app';
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

export const createUserProfileDocument = async (userAuth, addionalData) =>{
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const { displayName, email } = userAuth;
        const CreatedAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                CreatedAt,
                ...addionalData
            })
        } catch(error){
            console.log('error occured', error.message);
        }
    }

    return userRef;

}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;