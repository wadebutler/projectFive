import firebase from "firebase/app";
import "firebase/database";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBKlnuaD2J3QzgbB-CXLPa2Lv7EtVTg6Ew",
    authDomain: "quickchat-e9c30.firebaseapp.com",
    databaseURL: "https://quickchat-e9c30.firebaseio.com",
    projectId: "quickchat-e9c30",
    storageBucket: "quickchat-e9c30.appspot.com",
    messagingSenderId: "691587084122",
    appId: "1:691587084122:web:ec8ef2ff73f6de3fc9cd63"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;