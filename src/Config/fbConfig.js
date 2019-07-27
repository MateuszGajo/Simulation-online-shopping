import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var config = {
  //here your firebase project
};
firebase.initializeApp(config);

export default firebase;
