import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { CardHeader } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

const styles = {
  card: {
    // minWidth: 275,
    minWidth: 300,
    minHeight: 300,
    backgroundColor: '#AAA',
  },
};
const GameServerCard = (props) => {
  const { classes, serverInfo } = props;
  console.log('Game Server Card');
  console.log(serverInfo);
  return (
    <Card className={classes.card} color="green">
      {/* <CardHeader title={serverInfo.title} /> */}
      {/* <CardActionArea> */}
      <iframe
        // width="560"
        // height="315"
        src="https://www.youtube.com/embed/8mn-FFjIbo8"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      />
      {/* <iframe
        src="https://player.twitch.tv/?forsen"
        // height="<height>"
        // width="<width>"
        frameBorder="0"
        // scrolling="<scrolling>"
        allowFullScreen
      /> */}
      <CardContent>
        {/* <CardMedia
          component="iframe"
          src="https://www.youtube.com/embed/8mn-FFjIbo8"
          height="140"
        /> */}
        <Typography variant="subheading" style={{ display: 'inline-block' }}>
          Status Active Players 2/5
        </Typography>
      </CardContent>
      {/* </CardActionArea> */}

      <CardActions>
        <Button variant="contained">Start</Button>
        <Button variant="contained">Stop</Button>
        <Button variant="contained">Restart</Button>
      </CardActions>
    </Card>
  );
};
GameServerCard.propTypes = {
  classes: PropTypes.object.isRequired,
  serverInfo: PropTypes.object.isRequired,
};

export default withStyles(styles)(GameServerCard);
// export default MyServerPage;
