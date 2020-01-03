import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { CardHeader } from '@material-ui/core';
import GameServerCard from './GameServerCard';

const styles = {
  card: {
    // minWidth: 275,
    maxWidth: 300,
    backgroundColor: '#888',
  },
};

const MyGameServerPage = (props) => {
  const { classes, serverInfo } = props;
  console.log(serverInfo);
  console.log(serverInfo[0]);
  return (
    // <Grid item xs={12}>
    <Grid container spacing={8} direction="row" justify="center" alignItems="center">
      <Grid item>
        <GameServerCard serverInfo={serverInfo[0]} />
      </Grid>
      <Grid item>
        <GameServerCard serverInfo={serverInfo[1]} />
      </Grid>
      <Grid item>
        <GameServerCard serverInfo={serverInfo[1]} />
      </Grid>
    </Grid>
  );
};
MyGameServerPage.propTypes = {
  classes: PropTypes.object.isRequired,
  serverInfo: PropTypes.array.isRequired,
};

export default withStyles(styles)(MyGameServerPage);
// export default MyServerPage;
