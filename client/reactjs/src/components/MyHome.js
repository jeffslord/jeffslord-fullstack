import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MyCheckTable from "../components/MyCheckTable";

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
  const [testState, setTestState] = useState({
    cvName: "Test Calc View",
    cvVersion: "3.0",
    columns: [
      { title: "Check", field: "check" },
      {
        title: "Found",
        field: "found",
        cellStyle: rowData => ({
          backgroundColor: rowData === "Yes" ? "#e57373" : "#a5d6a7"
        })
      }
    ],
    data: [
      { check: "Split Nodes", found: "Yes" },
      { check: "Right Joins", found: "No" }
    ],
    options: {
      selection: true,
      selectionProps: rowData => ({
        disabled: rowData.found === "No",
        color: "primary"
      })
      // rowStyle: rowData => ({
      //   backgroundColor: rowData.found === "Yes" ? "#e57373" : "#a5d6a7"
      // })
    },
    actions: [
      {
        tooltip: "Fix all checks",
        icon: "check",
        onClick: (evt, data) => {
          console.log(evt, data);
        }
      }
    ]
  });

  useEffect(() => {
    document.title = "Jeff - Home";
  });

  return (
    <div className={classes.root}>
      <Typography variant="h1">WELCOME</Typography>
      <Typography variant="body1">
        This is the one and only website of Jeff Lord. Feel free to browse our
        limited selection of things.
      </Typography>
      <div style={{ maxWidth: "50%" }}>
        <MyCheckTable tableState={testState}></MyCheckTable>
      </div>
    </div>
  );
}
