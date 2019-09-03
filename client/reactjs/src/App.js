import React, { useState } from "react";
import "./App.css";
import MyCvParse from "./components/MyCvParse";
import MyBar from "./components/MyBar";
import MyDrawer from "./components/MyDrawer";

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(true);

  return (
    <div className="App">
      <MyBar setDrawerOpen={open => setDrawerOpen(open)}></MyBar>
      <MyDrawer
        drawerOpen={drawerOpen}
        setDrawerOpen={open => setDrawerOpen(open)}
      ></MyDrawer>
      <MyCvParse />
    </div>
  );
}
