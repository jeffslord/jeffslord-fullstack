import React, { Component } from "react";
import { DropzoneArea } from "material-ui-dropzone";
import MyCvTextBox from "./MyCvTextBox";
import MyFileUploader from "./MyFileUploader";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";

class MyCvParse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
  }
  TestButton() {
    fetch("http://localhost:5000/api/cv/", { method: "GET" });
  }
  SetFile(newFiles) {
    this.setState({ files: newFiles });
  }
  render() {
    return (
      <div>
        <Typography variant={"h1"}>Calculation View Optimizer</Typography>
        <Typography variant={"h2"}>Upload File or Paste Text</Typography>
        <MyFileUploader
          onUploadFiles={file => {
            this.SetFilef(file);
          }}
        />
        <MyCvTextBox />
        <Button variant={"contained"} onClick={this.TestButton}>
          Process
        </Button>
      </div>
    );
  }
}

export default MyCvParse;
