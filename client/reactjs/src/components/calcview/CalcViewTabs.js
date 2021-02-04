import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import CalcviewForm from "./CalcviewForm"
import CalcviewResultTable from "./CalcviewResultTable"

function CalcviewTabs(props) {
    return (
        <Tabs>
            <Tab eventKey="upload" title="Upload">
                <CalcviewForm />
            </Tab>
            <Tab eventKey="result" title="Result">
                <CalcviewResultTable />
            </Tab>
        </Tabs>
    )
}

export default CalcviewTabs;