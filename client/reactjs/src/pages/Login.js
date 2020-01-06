import React from 'react';
import FirebaseSignIn from '../components/FirebaseSignIn';
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";


const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        // flexGrow: "1",
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        height: "100%",
        'margin-top': "20px"
    }
}));

export default function Login(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container justify="center" alignItems="center" direction="column">
                <Grid item xs={12}>
                    <Typography variant={"h4"}>Please Sign In</Typography>
                </Grid>
                <Grid item xs={12}>
                    <FirebaseSignIn></FirebaseSignIn>
                </Grid>
            </Grid>
        </div>
    );
};
