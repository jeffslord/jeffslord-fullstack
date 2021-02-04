import Table from 'react-bootstrap/Table'

function CalcviewResultTable(props) {
    const buildTableContent = () => {
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
        <Table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Check</th>
                    <th>Was Found?</th>
                    <th>Can Autofix?</th>
                    <th>Data</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </Table>
    )

}
export default CalcviewResultTable;