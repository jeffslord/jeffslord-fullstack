import React, { useState, useEffect } from "react";
import CvFileUpload from '../components/CvFileUpload'
import CvResultTable from '../components/CvResultTable'
import CvResultStep from '../components/CvResultStep'
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import bsCustomFileInput from 'bs-custom-file-input'
import { CheckFile, FixView } from '../services/cvService'
const util = require("util");

function CvOptimizerIndividual(props) {
    const [tabsDisabled, setTabsDisabled] = useState(true);
    const [files, setFiles] = useState();
    const [checkResults, setCheckResults] = useState([]);
    const [tabKey, setTabKey] = useState('upload');

    useEffect(() => {
        document.title = "Calculation View Optimizer (Very early version...)";
        bsCustomFileInput.init()
    });

    const HandleProcessClick = () => {
        CheckFile(files, (err, results) => {
            if (err) {
                throw err;
            } else {
                setCheckResults(results);
                setTabsDisabled(false);
                setTabKey("results");
            }
        })
    }

    return (
        <div>
            <Tabs activeKey={tabKey} id="controlled-tab-example" onSelect={(k) => setTabKey(k)}>
                <Tab eventKey="upload" title="Upload">
                    <Container>
                        <h1>{checkResults[0] && checkResults[0].id ? checkResults[0].id : "No View Uploaded"}</h1>
                        <CvFileUpload setFiles={f => setFiles(f)}></CvFileUpload>
                        <Button block onClick={() => HandleProcessClick()}>Process</Button>
                    </Container>
                </Tab>
                <Tab eventKey="results" title="Results" disabled={tabsDisabled}>
                    <Container>
                        <h1>{checkResults[0] && checkResults[0].id ? checkResults[0].id : "No View Uploaded"}</h1>
                        <CvResultTable checkData={checkResults}></CvResultTable>
                        {/* <CvResultStep></CvResultStep> */}
                    </Container>
                </Tab>
                <Tab eventKey="fix" title="Fix" disabled={tabsDisabled}>
                    <Container>
                        <h1>{checkResults[0] && checkResults[0].id ? checkResults[0].id : "No View Uploaded"}</h1>
                        <Button block onClick={() => FixView(files, checkResults[0].id)}>Process</Button>

                    </Container>
                </Tab>
            </Tabs>


        </div >
    );
}

export default CvOptimizerIndividual;