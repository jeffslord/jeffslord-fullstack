import React, { useState, useEffect } from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  checkBad: {
    background: "red"
  },
  checkGood: {
    background: "green"
  }
}));

export default function MyCheckTable(props) {
  const classes = useStyles();

  const disabled = ["Calculated Columns in Filter", "Unmapped parameters"];

  return (
    <div>
      <ExpansionPanel>
        <ExpansionPanelSummary
          className={
            props.check.found === true ? classes.checkBad : classes.checkGood
          }
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <FormControlLabel
            aria-label="Acknowledge"
            onClick={event => event.stopPropagation()}
            onFocus={event => event.stopPropagation()}
            control={
              <Checkbox
                disabled={
                  disabled.indexOf(props.check.checkName) >= 0 ||
                  props.check.found === false
                }
                color="primary"
              />
            }
            // label={props.check.checkName}
          />
          <Typography>{props.check.checkName}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>{JSON.stringify(props.check.data)}</Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
