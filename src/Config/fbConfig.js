import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var config = {
  apiKey: "AIzaSyC3E3KzCf9nUGk-iKGg4b27vSh6sYv1Z-E",
  authDomain: "shop-9eef4.firebaseapp.com",
  databaseURL: "https://shop-9eef4.firebaseio.com",
  projectId: "shop-9eef4",
  storageBucket: "shop-9eef4.appspot.com",
  messagingSenderId: "1075788740535"
};
firebase.initializeApp(config);

export default firebase;
