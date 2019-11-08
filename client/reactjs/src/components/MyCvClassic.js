import React, { useState, useEffect } from "react";
import MyFileUploader from "./MyFileUploader";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import MyCheckTable from "../components/MyCheckTable";
import Snackbar from "@material-ui/core/Snackbar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import MySchemaList from "../components/MySchemaList";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    margin: "20px",
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  checkTable: {
    width: "100%",
    display: "flex"
  }
}));

export default function MyCvClassic() {
  const classes = useStyles();
  const [schema, setSchema] = useState([]);

  const [files, setFiles] = useState([]);
  const [results, setResults] = useState([]);
  // const [checks, setChecks] = useState(["version", "rightJoins", "splitNodes"]);
  const [xmlResult, setXmlResult] = useState();
  // const [xmls, setXmls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [textCopyOpen, setTextCopyOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  // const [checkComplete, setCheckComplete] = useState(false);

  useEffect(() => {
    document.title = "Calculation View Optimizer";
  });

  return (
    <div className={classes.root}>
      {console.log("RESULTS:", results)}
      {/* Instruction Box */}
      <Grid container justify="center" spacing={0}>
        <Grid item xs={12}>
          <Paper className={classes.paper} elevation={5}>
            <Typography variant={"h4"}>Instructions</Typography>
            <Typography variant={"body1"}>
              Select a schema to analyze. Process schema. List of calculation
              views will appear with the reports.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <MySchemaList></MySchemaList>
        </Grid>
        <Grid item xs={6}></Grid>
      </Grid>
    </div>
  );
}
