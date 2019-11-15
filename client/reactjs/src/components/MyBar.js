import React, { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

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

export default function MyBar(props) {
  const classes = useStyles();
  const [title, setTitle] = useState("Title");

  useEffect(() => {
    setTitle(document.title);
  });

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" onClick={() => props.setDrawerOpen(true)}>
            <MenuIcon></MenuIcon>
          </IconButton>
          <Typography variant="h6">{title}</Typography>
          {/* <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={"age"}
            // onChange={ }
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}
