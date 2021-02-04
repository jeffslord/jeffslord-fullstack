import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./screens/App";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import NotFound from "./screens/NotFound";
import Welcome from "./screens/Welcome";
// import HomeCvParse from "./components/HomeCvParse";
// import CvOptimizer from "./screens/CvOptimizer";
import Login from "./screens/Login"
import GameServers from "./screens/GameServers"
import AboutScreen from "./screens/AboutScreen"

import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
  <div>
    <BrowserRouter>
      <Route path="/" component={App} />
      <Switch>
        <Route exact path="/home" component={Welcome} />
        <Route exact path="/">
          <Redirect to="/home"></Redirect>
        </Route>
        {/* <Route exact path="/tools/cvoptimizer/" component={CvOptimizer} /> */}
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/games/servers/" component={GameServers} />
        {/* <Route exact path="/tools/cvclassic/" component={MyCvClassic} /> */}
        {/* <Route exact path="/tools/cvxsa/" component={MyCvXSA} /> */}
        <Route exact path="/about" component={AboutScreen} />
        <Route component={NotFound}></Route>
      </Switch>
    </BrowserRouter>
  </div >,
  document.getElementById("root")
);
registerServiceWorker();
