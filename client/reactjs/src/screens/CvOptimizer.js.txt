import React, { useState, useEffect } from "react";
import HomeCvParse from '../components/HomeCvParse';
import CvOptimizerIndividual from './CvOptimizerIndividual'
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CalcviewForm from "../components/calcview/CalcviewForm"

export default function CvOptimizer(props) {
    const [tabValue, setTabValue] = useState(0);

    const TabChange = val => {
        setTabValue(val);
        if (val === 0) {
        } else if (val === 1) {
        } else if (val === 2) {
        }
    };
    return (
        <div>
            <Grid item xs={12}>
                <Tabs value={tabValue} onChange={(event, val) => TabChange(val)}>
                    <Tab label="Individual View"></Tab>
                    <Tab label="XSA Project Zip [Not Implemented]"></Tab>
                    <Tab label="Classic Schema [Not Implemented]"></Tab>
                </Tabs>
            </Grid>
            {/* <HomeCvParse></HomeCvParse> */}
            <CvOptimizerIndividual></CvOptimizerIndividual>
            <CalcviewForm />
        </div>
    );
};
