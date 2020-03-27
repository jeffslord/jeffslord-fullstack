import React, { useEffect, useState } from "react";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import CvResultCard from './CvResultCard';


export default function CvResultStep(props) {

    let data = [
        {
            id: "autoFix",
            title: "Auto Fix View",
            body: "Generate a modified view that fixes split nodes and changes right joins to left joins."
        },
        {
            id: "calcColInFilter",
            title: "Calculated Columns In Filter",
            body: "Calculated columns were found in a filter. This is not optimal for performance. Check whether this can be changed."
        },
        {
            id: "unmapParam",
            title: "Unmapped Parameters",
            body: "Input parameters were found that are not mapped or used in a filter. Check whether this is an error."
        },
        {
            id: "hint",
            title: "Hints",
            body: "There are hints being used for this view. Check whether this is needed."
        }
    ]

    const BuildCards = () => {
        return (
            data.map((e, i) => {
                <CvResultCard step={i} title={e.title} body={e.body} ></CvResultCard>
            })
        )
    }

    return (
        <div>
            <Accordion defaultActiveKey="0">
                <BuildCards></BuildCards>
                {/* <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                        Step 1: Generate Auto Fixed View
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>This will generate a modified view that fixes split nodes, and change right joins to left joins.</Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="1">
                        Step 2: Calculated Columns In Filter
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>Calculated columns were found in a filter. This is not optimal for performance. Check whether this can be changed.</Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="2">
                        Step 3: Unmapped Parameters
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="2">
                        <Card.Body>Input parameters were found that are not mapped or used in a filter. Check whether this is an error.</Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="3">
                        Step 4: Hints
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="3">
                        <Card.Body>There are hints being used for this view. Check whether this is needed.</Card.Body>
                    </Accordion.Collapse>
                </Card> */}
            </Accordion>
        </div >
    )
}
