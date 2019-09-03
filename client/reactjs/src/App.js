import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import MyCvParse from "./components/MyCvParse";
import MyBar from "./components/MyBar";

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
    // const setDrawerState = value => {
    //   this.setState({
    //     drawerOpen: value
    //   });
    //   console.log(this.state.drawerOpen);
    // };
    return (
      <div className="App">
        <MyBar></MyBar>
        <MyCvParse />
      </div>
    );
  }
}

export default App;
