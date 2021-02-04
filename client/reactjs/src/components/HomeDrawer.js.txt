import Drawer from "@material-ui/core/Drawer";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import { Link } from "react-router-dom";
import Collapse from "@material-ui/core/Collapse";
import Divider from "@material-ui/core/Divider";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import HomeIcon from "@material-ui/icons/Home";
import BuildIcon from "@material-ui/icons/Build";
import HelpIcon from "@material-ui/icons/Help";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

export default function HomeDrawer(props) {
  const classes = useStyles();
  //   const [open, setOpen] = useState(true);

  const [expanded, setExpanded] = useState({ tools: false, other: false });
  // const tools = ["cvoptimizer"];

  const expandButton = name => {
    if (expanded[name] === true) {
      let expandedNew = JSON.parse(JSON.stringify(expanded));
      expandedNew[name] = false;
      setExpanded(expandedNew);
    } else {
      let expandedNew = JSON.parse(JSON.stringify(expanded));
      expandedNew[name] = true;
      setExpanded(expandedNew);
    }
  };

  const drawerList = () => (
    <div>
      <List className={classes.root}>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <HomeIcon></HomeIcon>
          </ListItemIcon>
          <ListItemText primary="Home"></ListItemText>
        </ListItem>
        <Divider></Divider>
        <ListItem button onClick={() => expandButton("tools")}>
          <ListItemIcon>
            <BuildIcon></BuildIcon>
          </ListItemIcon>
          <ListItemText primary="Tools"></ListItemText>
          {expanded["tools"] ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <ListItem>
          <Collapse in={expanded["tools"]} timeout="auto">
            <List disablePadding>
              <ListItem button component={Link} to="/tools/cvoptimizer/">
                <ListItemText primary="Calculation View Optimizer"></ListItemText>
              </ListItem>
              {/* <ListItem button component={Link} to="/tools/cvclassic/">
                <ListItemText primary="Classic Schema Analyzer"></ListItemText>
              </ListItem>
              <ListItem button component={Link} to="/tools/cvxsa/">
                <ListItemText primary="XSA Project Zip Analyzer"></ListItemText>
              </ListItem> */}
            </List>
          </Collapse>
        </ListItem>
        <Divider></Divider>
        {/* <ListItem button onClick={() => expandButton("other")}>
          <ListItemIcon>
            <HelpIcon></HelpIcon>
          </ListItemIcon>
          <ListItemText primary="Other"></ListItemText>
          {expanded["other"] ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <ListItem>
          <Collapse in={expanded["other"]} timeout="auto">
            <List disablePadding>
              <ListItem button>
                <ListItemText primary="Other 1"></ListItemText>
              </ListItem>
              <ListItem button>
                <ListItemText primary="Other 2"></ListItemText>
              </ListItem>
            </List>
          </Collapse>
        </ListItem>
        <Divider></Divider> */}
        <ListItem button component={Link} to="/login">
          <ListItemIcon>
            <HomeIcon></HomeIcon>
          </ListItemIcon>
          <ListItemText primary="Login"></ListItemText>
        </ListItem>
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
