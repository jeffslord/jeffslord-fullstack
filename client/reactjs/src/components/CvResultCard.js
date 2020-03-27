import React, { useEffect, useState } from "react";
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'

export default function CvResultCard(props) {
    return (
        <div>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey={props.step - 1}>
                    Step {props.step}: {props.title}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={props.step - 1}>
                    <Card.Body>{props.body}</Card.Body>
                </Accordion.Collapse>
            </Card>
        </div >
    )
}
