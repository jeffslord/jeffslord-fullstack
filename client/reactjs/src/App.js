import React, { useState } from "react";
import "./App.css";
import MyCvParse from "./components/MyCvParse";
import MyBar from "./components/MyBar";
import MyDrawer from "./components/MyDrawer";

export default function App() {
  return (
    <div className="App">
      <MyBar></MyBar>
      <MyDrawer></MyDrawer>
      <MyCvParse />
    </div>
  );
}
