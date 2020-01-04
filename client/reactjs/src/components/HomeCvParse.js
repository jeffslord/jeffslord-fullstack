import React, { useState, useEffect } from "react";
import HomeFileUploaderIndividual from "./HomeFileUploaderIndividual";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import HomeCvExpansionResult from "./HomeCvExpansionResult";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    // padding: theme.spacing(2),
    margin: "20px",
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  checkTable: {
    width: "100%",
    display: "flex"
  },
  expansionGood: {
    background: "red"
  },
  button: {
    minHeight: "75px"
  }
}));

export default function HomeCvParse() {
  const classes = useStyles();

  const [files, setFiles] = useState([]);
  const [results, setResults] = useState([]);
  const [xmlResult, setXmlResult] = useState();
  const [loading, setLoading] = useState(false);
  const [textCopyOpen, setTextCopyOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [resHeaders, setResHeaders] = useState([]);
  const [resChecks, setResChecks] = useState([]);

  useEffect(() => {
    document.title = "Calculation View Optimizer";
  });

  // Run analysis on file to get all values returned
  const AnalyzeButton = () => {
    if (files.length > 0) {
      console.log("FILES", files);

      let data = new FormData();
      for (const f in files) {
        data.append("files", files[f]);
        console.log(f);
      }
      console.log(data);

      // data.append("files", files);
      // fetch("http://cv_api.jeffslord.com/api/cv", {
      //   method: "get"
      // });
      fetch("http://cv_api.jeffslord.com/api/cv/analyzeManyFiles", {
        method: "post",
        body: data
      })
        .then(res => res.json())
        .then(data => {
          // console.log("res.json", data);
          setResults(data);
          GetHeaders(data, (err, headers) => {
            setResHeaders(headers);
            GetChecks(data, (err2, checks) => {
              setResChecks(checks);
            });
          });
        });
      return;
    }
  };
  // extract header information from the result set containing all data
  const GetHeaders = (data, cb) => {
    let headers = [];
    data.forEach(ele => {
      headers.push(ele.header);
      console.log("HEADER:", ele.header);
    });
    return cb(null, headers[0]);
  };
  // extract data information from the result set
  const GetChecks = (data, cb) => {
    let checks = [];
    data.forEach(ele => {
      checks.push(ele.checks);
      console.log("CHECK:", ele.checks);
    });
    return cb(null, checks[0]);
  };
  // const Fixbutton = () => {
  //   if (files.length > 0) {
  //     let data = new FormData();
  //     data.append("file", files[0]);
  //     setLoading(true);
  //     fetch("http://cv_api.jeffslord.com/api/cv/fixSingleFile", {
  //       method: "post",
  //       body: data
  //     })
  //       .then(res => res.json())
  //       .then(data => {
  //         // console.log("xml", data["xml"]);
  //         setLoading(false);
  //         setXmlResult(data["xml"]);
  //       });
  //     return;
  //   }
  // };

  const DownloadCalcView = (name, content) => {
    if (xmlResult !== undefined) {
      var atag = document.createElement("a");
      var file = new Blob([content], { type: "hdbclaculationview" });
      atag.href = URL.createObjectURL(file);
      atag.download = name;
      atag.click();
    }
  };
  const TabChange = val => {
    setTabValue(val);
    if (val === 0) {
    } else if (val === 1) {
    } else if (val === 2) {
    }
  };

  return (
    <div className={classes.root}>
      {console.log("RESULTS:", results)}
      {/* Tab Bar */}
      <Grid item xs={12}>
        <Paper square>
          <Tabs value={tabValue} onChange={(event, val) => TabChange(val)}>
            <Tab label="Individual View"></Tab>
            <Tab label="XSA Project Zip"></Tab>
            <Tab label="Classic Schema"></Tab>
          </Tabs>
        </Paper>
      </Grid>
      {/* Instruction Box */}
      <Grid container justify="center" spacing={0}>
        <Grid item xs={12}>
          <Paper className={classes.paper} elevation={5}>
            <Typography variant={"h4"}>Instructions</Typography>
            <Typography variant={"body1"}>
              Upload a file, click process, check for red boxes, press fix, copy
              text, paste into calculation view, run auto format.
            </Typography>
          </Paper>
        </Grid>
        {/* <Paper className={classes.paper}> */}
        {/* Upload Box */}
        {/* <Grid item xs={12}></Grid> */}
        <Grid item xs={12}>
          <Paper className={classes.paper} elevation={5}>
            <ExpansionPanel defaultExpanded>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant={"h3"}>Upload</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container>
                  <Grid item xs={12}>
                    <HomeFileUploaderIndividual
                      setparentfiles={files => setFiles(files)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      className={classes.button}
                      size="large"
                      fullWidth
                      variant={"contained"}
                      files={files}
                      onClick={() => AnalyzeButton()}
                      color="primary"
                    >
                      Process
                    </Button>
                  </Grid>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Paper>
        </Grid>
        {/* Checks */}
        <Grid item xs={12}>
          <Paper className={classes.paper} elevation={5}>
            <ExpansionPanel defaultExpanded>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h3">Results</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <List>
                  {resChecks.map((check, i) => (
                    <ListItem>
                      {/* <ul key={i}> */}
                      <HomeCvExpansionResult check={check}></HomeCvExpansionResult>
                      {/* </ul> */}
                    </ListItem>
                  ))}
                </List>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Paper>
        </Grid>
        {/* Text Result Box */}
        <Grid item xs={12}>
          <Paper className={classes.paper} elevation={5}>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant={"h3"}>Text</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      onClick={() => {
                        DownloadCalcView("Fixed", xmlResult);
                      }}
                    >
                      Download txt
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        navigator.clipboard.writeText(xmlResult);
                        setTextCopyOpen(true);
                      }}
                    >
                      Copy
                    </Button>
                    <Snackbar
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left"
                      }}
                      open={textCopyOpen}
                      autoHideDuration={1000}
                      onClose={() => {
                        setTextCopyOpen(false);
                      }}
                      ContentProps={{
                        "aria-describedby": "message-id"
                      }}
                      message={<span id="message-id">Text Copied</span>}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      multiline={true}
                      value={xmlResult}
                      rowsMax={Infinity}
                      fullWidth
                    ></TextField>
                  </Grid>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
