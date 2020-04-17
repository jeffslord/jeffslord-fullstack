import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table'
import Spinner from 'react-bootstrap/Spinner'

export default function CvResultTable(props) {

    const BuildTable = () => {
        return (
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Check</th>
                        <th>Found</th>
                        <th>Autofix?</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {BuildTableContent()}
                </tbody>
            </Table>
        )
    }

    const BuildTableContent = () => {
        if (props.checkData.length <= 0) {
            return;
        } else {
            let checks = props.checkData[0].checks;
            return (
                checks.map((e, i) => (
                    <tr>
                        <td>{i + 1}</td>
                        <td>{JSON.stringify(e.checkName).slice(1, -1)}</td>
                        <td>{JSON.stringify(e.found)}</td>
                        <td>{JSON.stringify(e.autoFix)}</td>
                        <td>{JSON.stringify(e.data)}</td>
                    </tr>
                ))
            )
        }
    }

    return (
        <div>
            {props.checkData.length <= 0 ? <Spinner animation="border" variant="primary" /> : BuildTable()}
        </div >
    )
}
