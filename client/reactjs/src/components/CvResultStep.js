import React, { useEffect, useState } from "react";
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'

export default function CvResultStep(props) {
    return (
        <div>
            <Accordion defaultActiveKey="0">
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                        Step n:
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>This is autofixable. Select on next screen.</Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="1">
                        Step n:
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>Hello! I'm another body</Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </div >
    )
}
