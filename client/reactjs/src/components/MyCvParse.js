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
  render() {
    return (
      <div>
        <Typography variant={"h1"}>Calculation View Optimizer</Typography>
        <Typography variant={"h2"}>Upload File or Paste Text</Typography>
        <MyFileUploader />
        <MyCvTextBox />
        <Button variant={"contained"}>Process</Button>
      </div>
    );
  }
}

export default MyCvParse;
