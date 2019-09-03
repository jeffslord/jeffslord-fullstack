import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
// import { mailFolderListItems, otherMailFolderListItems } from "./tileData";
import { ListItem } from '@material-ui/core';

const styles = {};

const MyDrawer = (props) => {
  const { classes, setDrawerState, open } = props;
  const categorySecurity = ['Security', 'Cameras', 'Sensors'];
  const categoryMedia = ['Media'];
  const categoryServer = ['Servers', 'Game1'];
  const sideList = (
    <div>
      <List>
        {categorySecurity.map(cat => (
          <ListItem button>{cat}</ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {categoryMedia.map(cat => (
          <ListItem button>{cat}</ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {categoryServer.map(cat => (
          <ListItem button>{cat}</ListItem>
        ))}
      </List>
    </div>
  );
  return (
    <div>
      {/* <Button onClick={props.toggleDrawer}>Open Drawer</Button> */}
      <Drawer open={open} onClose={() => setDrawerState(!open)}>
        <div onClick={() => setDrawerState(false)}>{sideList}</div>
      </Drawer>
    </div>
  );
};
MyDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  setDrawerState: PropTypes.func.isRequired,
};

export default withStyles(styles)(MyDrawer);
