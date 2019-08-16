import React, { Component } from "react";
import MyCvTextBox from "./MyCvTextBox";
import MyFileUploader from "./MyFileUploader";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { log } from "util";

class MyCvParse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      test: "",
      results: "test"
    };
    // this.TestButton = this.TestButton.bind(this);
    // this.SetFile = this.SetFile.bind(this);
  }
  TestButton() {
    fetch("http://localhost:5000/api/cv/analyze", { method: "GET" })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        // console.log(data.name);
        this.setState({ results: data });
      });
    // .then(data => this.setState({ results: data }));
    this.setState({ test: "test works" });
    console.log(this.state);
  }
  SetFile(newFiles) {
    console.log("Previous state: ", this.state);
    this.setState({ files: newFiles }, () => {
      console.log("New state: ", this.state);
    });
  }
  UploadXML(files) {
    // let data = new FormData();
    // data.append("file", file);
    // // data.append("name", name);
    // console.log("FormData: ", data);
    let data = {};
    data.xml = files[0];
    console.log("Data: ", data);
  }
  render() {
    return (
      <div>
        <Typography variant={"h1"}>Calculation View Optimizer</Typography>
        <Typography variant={"h2"}>Upload File or Paste Text</Typography>
        <MyFileUploader
          // onUploadFiles={file => {
          //   this.SetFile(file);
          // }}
          setparentfiles={files => this.SetFile(files)}
        />
        {/* <MyCvTextBox /> */}
        <Button
          variant={"contained"}
          files={this.state.files}
          onClick={() => this.UploadXML(this.state.files)}
        >
          Process
        </Button>
        <TextField
          multiline={true}
          value={JSON.stringify(this.state.results)}
          rowsMax={Infinity}
        />
      </div>
    );
  }
}

export default MyCvParse;
