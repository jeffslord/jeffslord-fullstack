import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
function CalcviewForm(props) {
    return (
        <Form>
            <Form.Label>Calculation View File</Form.Label>
            <Form.File id="cv-upload" label="Calculation View Upload" custom />
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default CalcviewForm;