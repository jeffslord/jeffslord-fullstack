import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

// Configure Firebase.
const config = {
    apiKey: "AIzaSyDb-zxsWjXlt9XeFaq2ZHTq7gwHE0gEVJw",
    authDomain: "home-f65a9.firebaseapp.com",
    databaseURL: "https://home-f65a9.firebaseio.com",
    projectId: "home-f65a9",
    storageBucket: "home-f65a9.appspot.com",
    messagingSenderId: "922208273323",
    appId: "1:922208273323:web:d3d64b8c000760c7b0c8ee",
    measurementId: "G-F5GWGZ6DSG",
};
firebase.initializeApp(config);

// Configure FirebaseUI.
const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ]
};
export default function FirebaseSignIn() {
    return (
        <div>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </div>
    );
}