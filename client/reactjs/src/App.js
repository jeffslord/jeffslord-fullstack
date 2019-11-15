import React, { useState } from "react";
import "./App.css";
import MyCvParse from "./components/MyCvParse";
import MyBar from "./components/MyBar";
import MyDrawer from "./components/MyDrawer";
import { Route, Switch } from "react-router-dom";
import MyHome from "./components/MyHome";
import MyCvClassic from "./components/MyCvClassic";
import MyCvXSA from "./components/MyCvXSA";

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  // const [barTitle, setBarTitle] = useState("Home");

  return (
    <div className="App">
      <MyBar
        setDrawerOpen={open => setDrawerOpen(open)}
        title={"Title"}
      ></MyBar>
      <MyDrawer
        drawerOpen={drawerOpen}
        setDrawerOpen={open => setDrawerOpen(open)}
      ></MyDrawer>
      <Switch>
        <Route exact path="/" component={MyHome} />
        <Route exact path="/tools/cvoptimizer/" component={MyCvParse} />
        <Route exact path="/tools/cvclassic/" component={MyCvClassic} />
        <Route exact path="/tools/cvxsa/" component={MyCvXSA} />
      </Switch>
    </div>
  );
}
