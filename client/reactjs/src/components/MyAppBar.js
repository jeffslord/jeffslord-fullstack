import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
  appBar: {
    marginBottom: 10,
  },
};

const MyAppBar = (props) => {
  //   const { classes } = props;
  const { classes, setDrawerState } = props;
  return (
    <div>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <IconButton
            // className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={() => setDrawerState(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit">
            Jeff&apos;s Website
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

MyAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  setDrawerState: PropTypes.func.isRequired,
};

export default withStyles(styles)(MyAppBar);
