import React from 'react';
import Form from 'react-bootstrap/Form'
import '../css/CvFileUpload.css';

function CvFileUpload(props) {
    return (
        <div class="form-div">
            <Form>
                <Form.File onChange={(event) => props.setFiles(event.target.files)} label="Upload views" custom></Form.File>
            </Form>
        </div>
    );
}

export default CvFileUpload;