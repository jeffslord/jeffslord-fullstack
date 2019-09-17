import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MaterialTable from "material-table";

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
  const [state, setState] = useState({
    columns: [
      { title: "Check", field: "check" },
      {
        title: "Found",
        field: "found",
        cellStyle: rowData => ({
          // backgroundColor: {
          // console.log(rowData);
          // if (rowData === "Yes") {
          //   backgroundColor= "#FFF";
          // }
          backgroundColor: rowData === "Yes" ? "#e57373" : "#a5d6a7"
          // })
          // console.log(rowData);
        })
      },
      { title: "Fix", field: "fix" }
    ],
    data: [
      { check: "Split Nodes", found: "Yes", fix: "Test3" },
      { check: "Right Joins", found: "No", fix: "Test3" },
      { check: "Other", found: "Yes", fix: "Test5" }
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
        <MaterialTable
          title="Check Fix"
          columns={state.columns}
          data={state.data}
          options={state.options}
          actions={state.actions}
        ></MaterialTable>
      </div>
    </div>
  );
}
