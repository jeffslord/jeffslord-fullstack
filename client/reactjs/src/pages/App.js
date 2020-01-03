import React, { useState, useEffect } from "react";
import "./App.css";
import HomeBar from "../components/HomeBar";
import HomeDrawer from "../components/HomeDrawer";
// import firebase from 'firebase';


export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged(newUser => {
  //     if (newUser) {
  //       setUser(newUser);
  //     }
  //   })
  // });


  return (
    <div className="App">
      <HomeBar
        setDrawerOpen={open => setDrawerOpen(open)}
        title={"Title"}
      />
      <HomeDrawer
        drawerOpen={drawerOpen}
        setDrawerOpen={open => setDrawerOpen(open)}
      ></HomeDrawer>
    </div >
  );
}
