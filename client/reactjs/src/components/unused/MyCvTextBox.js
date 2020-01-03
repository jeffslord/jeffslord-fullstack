import TextField from "@material-ui/core/TextField";
import React, { Component } from "react";

export default function MyCvTextBox() {
  return (
    <TextField
      id="filled-with-placeholder"
      label="With placeholder"
      placeholder="Placeholder"
      // className={classes.textField}
      margin="normal"
      variant="filled"
    />
  );
}
