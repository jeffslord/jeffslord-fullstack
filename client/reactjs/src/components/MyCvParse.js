import React, { Component, useState } from "react";
import MyCvTextBox from "./MyCvTextBox";
import MyFileUploader from "./MyFileUploader";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { log } from "util";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

export default function MyCvParse() {
  const classes = useStyles();

  const [files, setFiles] = useState([]);
  const [test, setTest] = useState("");
  const [results, setResults] = useState({});
  const [checks, setChecks] = useState(["version", "rightJoins", "splitNodes"]);

  const TestButton = () => {
    if (files.length > 0) {
      let data = new FormData();
      data.append("file", files[0]);
      fetch("http://localhost:5000/api/cv/upload", {
        method: "post",
        body: data
      })
        .then(res => res.json())
        .then(data => {
          console.log("res.json", data);
          setResults(data);
        });
      return;
      // setTest("test works");
    }
  };

  // const UploadXML = files => {
  //   let data = {};
  //   data.xml = files[0];
  //   console.log("Data: ", data);
  // };
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item sm>
          <Typography variant={"h1"}>Calculation View Optimizer</Typography>
          <Typography variant={"h2"}>Upload File or Paste Text</Typography>
        </Grid>
      </Grid>

      <Grid container justify="center" spacing={3}>
        <Paper className={classes.paper}>
          <Grid item>
            <MyFileUploader setparentfiles={files => setFiles(files)} />
          </Grid>
          <Grid item>
            <Button
              size="large"
              fullWidth
              variant={"contained"}
              files={files}
              onClick={() => TestButton()}
            >
              Process
            </Button>
          </Grid>
        </Paper>
        <Paper className={classes.paper}>
          <Grid container justify="center">
            <List>
              {/* <Button>Test</Button> */}
              {console.log("results", results)}

              {checks.map(check => {
                console.log("results.check", results[check]);
                if (
                  results[check] != null &&
                  results[check] != {} &&
                  results[check].length != 0 &&
                  check != "version"
                )
                  return (
                    <ListItem alignItems="center">
                      <Button variant="contained" color="secondary">
                        {check}
                      </Button>
                    </ListItem>
                  );
                else {
                  return (
                    <ListItem alightItems="center">
                      <Button variant="contained" color="primary">
                        {check}
                      </Button>
                    </ListItem>
                  );
                }
              })}
            </List>
          </Grid>
          <Grid container justify="center">
            <Button variant="contained" size="large">
              Fix
            </Button>
          </Grid>
        </Paper>
      </Grid>

      <Grid container>
        <Grid item sm>
          <TextField
            multiline={true}
            value={JSON.stringify(results)}
            rowsMax={Infinity}
          ></TextField>
        </Grid>
        <Grid item sm>
          <TextField
            multiline={true}
            value={JSON.stringify(results)}
            rowsMax={Infinity}
          ></TextField>
        </Grid>
      </Grid>
    </div>
  );
}
