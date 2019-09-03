import Drawer from "@material-ui/core/Drawer";
import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";

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

export default function MyDrawer(props) {
  const classes = useStyles();
  //   const [open, setOpen] = useState(true);

  const drawerList = () => (
    <div>
      <List>
        {["Calc View Optimizer"].map((text, index) => (
          <ListItem>
            <ListItemText primary={text}></ListItemText>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <Drawer
        open={props.drawerOpen}
        onClose={() => props.setDrawerOpen(false)}
      >
        {drawerList()}
      </Drawer>
    </div>
  );
}
