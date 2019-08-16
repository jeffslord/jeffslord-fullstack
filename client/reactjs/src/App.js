import React from "react";
import logo from "./logo.svg";
import "./App.css";
// import Button from "@material-ui/core/Button";
// import MyDrawer from "./components/MyDrawer";
// import MyAppBar from "./components/MyAppBar";
// import MyGameServerPage from "./components/MyGameServerPage";
import MyCvParse from "./components/MyCvParse";
// import MyCvTextBox from "./components/MyCvTextBox";
// import MyFileUploader from "./components/MyFileUploader";
// import { Typography } from "@material-ui/core";

// import ReactHLS from "react-hls";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
      gameServerInfo: [
        {
          title: "Title 1",
          status: "stopped",
          maxPlayers: 5,
          currentPlayers: 0
        },
        {
          title: "Title 2",
          status: "started",
          maxPlayers: 3,
          currentPlayers: 2
        }
      ]
    };
    console.log(this.state);
  }

  render() {
    const setDrawerState = value => {
      this.setState({
        drawerOpen: value
      });
      // console.log(value);
      console.log(this.state.drawerOpen);
    };
    return (
      <div className="App">
        {/* <MyDrawer open={this.state.drawerOpen} setDrawerState={value => setDrawerState(value)} />
        <MyAppBar setDrawerState={value => setDrawerState(value)} />
        <MyGameServerPage serverInfo={this.state.gameServerInfo} /> */}
        {/* <Typography variant={"h1"}>Calculation View Optimizer</Typography>
        <Typography variant={"h2"}>Upload File or Paste Text</Typography>
        <MyFileUploader />
        <MyCvTextBox />
        <Button variant={"contained"}>Process</Button> */}
        <MyCvParse />
      </div>
    );
  }
}

// }

export default App;
