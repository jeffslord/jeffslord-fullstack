import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MaterialTable from "material-table";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto"
    // maxHeight: 300
  },
  listSection: {
    backgroundColor: "inherit"
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0
  }
}));

export default function MySchemaList() {
  const classes = useStyles();
  const [cvs, setCvs] = useState([]);

  return (
    <List className={classes.root}>
      {cvs.map(s => (
        <ListItem>
          <ListItemText primary={`${s}`} />
        </ListItem>
      ))}
    </List>
    // <MaterialTable
    //   className={classes.root}
    //   title="Schemas"
    //   // columns={state.columns}
    //   columns={[{ title: "CV", field: "cv" }]}
    //   data={cvs}
    //   options={{
    //     selection: true,
    //     pageSize: 10
    //   }}
    // />
  );
}
