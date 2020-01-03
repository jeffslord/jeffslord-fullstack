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

export default function MySchemaList(props) {
  const classes = useStyles();
  const [schemas, setSchemas] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [selectedSchemas, setSelectSchemas] = useState([]);

  useEffect(() => {
    if (!loaded) {
      GetSchemas();
      setLoaded(true);
    }
  });

  const GetSchemas = () => {
    fetch("/api/hana/schemasClassic", {
      method: "get"
    })
      .then(res => res.json())
      .then(data => {
        console.log("res.json", data);
        setSchemas(data);
      });
    schemas.forEach(s => {
      console.log(s);
    });
    return;
  };

  return (
    <MaterialTable
      className={classes.root}
      title="Schemas"
      // columns={state.columns}
      columns={[{ title: "Schema", field: "SCHEMA_NAME" }]}
      data={schemas}
      options={{
        selection: true,
        pageSize: 10
      }}
      onSelectionChange={rows => {
        setSelectSchemas(rows);
      }}
    />
  );
}
