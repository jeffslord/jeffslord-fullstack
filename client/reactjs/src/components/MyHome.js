import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import MyCheckTable from "../components/MyCheckTable";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function MyHome(props) {
  const classes = useStyles();

  useEffect(() => {
    document.title = "Home";
  });

  return (
    <div className={classes.root}>
      <Typography variant="h1">WELCOME</Typography>
      <Typography variant="body1">
        This is the one and only website of Jeff Lord. Feel free to browse our
        limited selection of things.
      </Typography>
      {/* <div style={{ maxWidth: "50%" }}>
        <MyCheckTable tableState={testState}></MyCheckTable>
      </div> */}
    </div>
  );
}
