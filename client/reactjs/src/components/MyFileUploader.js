import React, { Component } from "react";
import { DropzoneArea } from "material-ui-dropzone";

class MyFileUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
  }
  // handleChange(files) {
  //   // const { setParentFiles, ...rest } = this.props;
  //   this.setState(
  //     {
  //       files: files
  //     },
  //     () => {
  //       console.log("Uploader state: ", this.state);
  //       this.props.setparentfiles(this.state.files);
  //     }
  //   );
  //   // this.props.onUploadFiles(this.state.files);
  // }

  render() {
    return (
      // <DropzoneArea onChange={this.handleChange.bind(this)} filesLimit={1} />
      <DropzoneArea
        // onChange={() => this.props.setparentfiles(this)}
        // onChange={files => this.handleChange(files)}
        onChange={files => this.props.setparentfiles(files)}
        filesLimit={1}
        acceptedFiles={["text/*"]}
      />
    );
  }
}

export default MyFileUploader;
