import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./pages/App";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Welcome from "./pages/Welcome";
// import HomeCvParse from "./components/HomeCvParse";
import CvParse from "./pages/CvParse";
import Login from "./pages/Login"

ReactDOM.render(
  <div>
    <BrowserRouter>
      <Route path="/" component={App} />
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route exact path="/tools/cvoptimizer/" component={CvParse} />
        <Route exact path="/login" component={Login}></Route>
        {/* <Route exact path="/tools/cvclassic/" component={MyCvClassic} /> */}
        {/* <Route exact path="/tools/cvxsa/" component={MyCvXSA} /> */}
        <Route component={NotFound}></Route>
      </Switch>
    </BrowserRouter>
  </div >,
  document.getElementById("root")
);
registerServiceWorker();
