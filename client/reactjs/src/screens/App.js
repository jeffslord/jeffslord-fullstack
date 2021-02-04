import React, { useState, useEffect } from "react";
import "./App.css";
import HomeBar from "../components/HomeBar";
import HomeDrawer from "../components/HomeDrawer";
import firebase from 'firebase';
import MyNavbar from "../components/navigation/MyNavbar";

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [idToken, setIdToken] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(newUser => {
      // console.log(newUser);
      if (newUser !== null) {
        firebase.auth().currentUser.getIdToken(true).then((idToken) => {
          // console.log(idToken);
          setIdToken(idToken);
        }).catch((error) => {
          // console.log(error);
          setIdToken(null);
        })
      } else {
        setIdToken(null);
      }
    })
  });


  return (
    <div className="App">
      {/* <HomeBar
        setDrawerOpen={open => setDrawerOpen(open)}
        title={"Title"}
      /> */}
      <MyNavbar></MyNavbar>
      {/* <HomeDrawer
        drawerOpen={drawerOpen}
        setDrawerOpen={open => setDrawerOpen(open)}
      ></HomeDrawer> */}
    </div >
  );
}
