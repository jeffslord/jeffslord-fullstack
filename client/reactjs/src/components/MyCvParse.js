import React, { Component, useState } from "react";
import MyCvTextBox from "./MyCvTextBox";
import MyFileUploader from "./MyFileUploader";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { log } from "util";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

function MyCvParse() {
  // class MyCvParse extends Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       files: [],
  //       test: "",
  //       results: "Results here."
  //     };
  //     // this.TestButton = this.TestButton.bind(this);
  //     // this.SetFile = this.SetFile.bind(this);
  //   }
  const [files, setFiles] = useState(null);
  const [test, setTest] = useState("");
  const [results, setResults] = useState("Results here");

  const TestButton = () => {
    let data = new FormData();
    // data.append("file", this.state.files[0]);
    data.append("file", files[0]);
    fetch("http://localhost:5000/api/cv/upload", {
      method: "post",
      body: data
    })
      .then(res => res.json())
      .then(data => {
        console.log("res.json", data);
        // console.log(data.name);
        //  this.setState({ results: data });
        setResults(data);
      });
    // .then(data => this.setState({ results: data }));
    // this.setState({ test: "test works" });
    setTest("test works");
    // console.log(this.state);
    // test;
  };
  const SetFile = newFiles => {
    // console.log("Previous state: ", this.state);
    console.log("Previous files: ", files);

    // this.setState({ files: newFiles }, () => {
    setFiles(newFiles, () => {
      console.log("New files: ", files);
    });
  };
  const UploadXML = files => {
    // let data = new FormData();
    // data.append("file", file);
    // // data.append("name", name);
    // console.log("FormData: ", data);
    let data = {};
    data.xml = files[0];
    console.log("Data: ", data);
  };
  // render() {
  return (
    <div>
      <Grid container>
        {/* <Paper> */}
        <Grid item>
          <Typography variant={"h1"}>Calculation View Optimizer</Typography>
        </Grid>
        <Grid item>
          <Typography variant={"h2"}>Upload File or Paste Text</Typography>
        </Grid>
        {/* </Paper> */}
        <MyFileUploader
          // onUploadFiles={file => {
          //   this.SetFile(file);
          // }}
          // setparentfiles={files => this.SetFile(files)}
          setparentfiles={files => setFiles(files)}
        />
        {/* <MyCvTextBox /> */}
        <Button
          variant={"contained"}
          // files={this.state.files}
          files={files}
          // onClick={() => this.UploadXML(this.state.files)}
          // onClick={() => this.TestButton()}
          onClick={() => TestButton()}
        >
          Process
        </Button>
        {/* <TextField
          multiline={true}
          value={JSON.stringify(this.state.results)}
          rowsMax={Infinity}
        /> */}
        <TextField
          multiline={true}
          // value={JSON.stringify(this.state.results)}
          value={JSON.stringify(results)}
          rowsMax={Infinity}
        ></TextField>
      </Grid>
    </div>
  );
  // }
  // }
}

export default MyCvParse;
