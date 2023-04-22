import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/performance";

const config = {
  apiKey: "AIzaSyCn00e1NJtE5WkU6iog5-ZyF-NKdI-LCe0",
  authDomain: "trading-simulator-56b98.firebaseapp.com",
  databaseURL: "https://trading-simulator-56b98-default-rtdb.firebaseio.com",
  projectId: "trading-simulator-56b98",
  storageBucket: "trading-simulator-56b98.appspot.com",
  messagingSenderId: "419533933476",
  appId: "1:419533933476:web:fd9df78c0391b93509cf31",
  measurementId: "G-TKNB2HN2GC",
};

firebase.initializeApp(config);

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const firebaseAuth = firebase.auth;
export const db = firebase.firestore();
export const perf = firebase.performance();

export function loginWithGoogle() {
  return firebaseAuth().signInWithRedirect(googleProvider);
}

export function auth(email, pw) {
  let username = localStorage.getItem("user");
  return firebaseAuth()
    .createUserWithEmailAndPassword(email, pw)
    .then(function (newUser) {
      db.collection("users")
        .doc(newUser.user.uid)
        .set({
          email,
          username,
          funds: "100000",
          currentfunds: "100000",
          positions: "0",
          admin: false,
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });
      return firebase.auth().currentUser.updateProfile({
        displayName: username,
      });
    });
}

export function logout() {
  return firebaseAuth().signOut();
}

export function login(email, pw) {
  return firebaseAuth().signInWithEmailAndPassword(email, pw);
}

export function resetPassword(email) {
  return firebaseAuth().sendPasswordResetEmail(email);
}
