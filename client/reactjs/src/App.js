import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Button from "@material-ui/core/Button";
import MyDrawer from "./components/MyDrawer";
import MyAppBar from "./components/MyAppBar";
import MyGameServerPage from "./components/MyGameServerPage";
import MyCvParse from "./components/MyCvParse";
import MyCvTextBox from "./components/MyCvTextBox";
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
        <MyCvParse />
        <MyCvTextBox />
      </div>
    );
  }
}

// }

export default App;
