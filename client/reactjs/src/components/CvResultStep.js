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

    const BuildCards = () => (
        data.map((e, i) => {
            return <CvResultCard step={i + 1} title={e.title} body={e.body} ></CvResultCard>
        })
    )

    return (
        <div>
            {console.log(props.checkResults)}
            <Accordion defaultActiveKey="0">
                <BuildCards></BuildCards>
            </Accordion>
        </div >
    )
}
