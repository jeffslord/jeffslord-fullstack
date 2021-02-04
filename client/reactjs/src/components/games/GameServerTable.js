import Table from 'react-bootstrap/Table'

function GameServerTable(props) {

    return (
        <Table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Game</th>
                    <th>Host</th>
                    <th>Port</th>
                    <th>Notes</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Terraria</td>
                    <td>terraria.jeffslord.com</td>
                    <td>7777</td>
                    <td></td>
                </tr>
            </tbody>
        </Table>
    )
}

export default GameServerTable;