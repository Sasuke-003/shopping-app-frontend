import { useState } from "react";
import { Container, Row, Col, Form, Button, ProgressBar, Alert } from "react-bootstrap";
import axios from "axios";
import "./AddBanner.css";
import { getPopup } from "../../util";

function AddBanner() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [progress, setProgress] = useState();
    const [error, setError] = useState();

    const submitHandler = (e) => {
        e.preventDefault(); //prevent the form from submitting
        let formData = new FormData();

        formData.append("img", selectedFiles[0]);
        //Clear the error message
        setError("");
        axios
            .post("/item/add", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress: (data) => {
                    //Set the progress value to show the progress bar
                    setProgress(Math.round((100 * data.loaded) / data.total));
                },
            })
            .catch((error) => {
                const { code } = error?.response?.data;
                switch (code) {
                    case "FILE_MISSING":
                        setError("Please select a file before uploading!");
                        break;
                    default:
                        setError("Sorry! Something went wrong. Please try again later");
                        break;
                }
            });
    };
    return (
        <Container id='image-uploader__container'>
            <h3 className='add-product__basic-title'>CURRENT BANNER</h3>{" "}
            <img className='add-banner-banner' src='/images/winter-banner.jpg' alt='No banner is set' />
            <Row>
                <Col lg={{ span: 4, offset: 3 }}>
                    <Form action='http://localhost:8081/upload_file' method='post' encType='multipart/form-data' onSubmit={submitHandler}>
                        <Form.Group>
                            <Form.File
                                id='exampleFormControlFile1'
                                label='CHOOSE IMAGE FOR BANNER'
                                name='file'
                                onChange={(e) => {
                                    setSelectedFiles(e.target.files);
                                }}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Button id='add-product-btn' variant='info' type='submit'>
                                UPLOAD BANNER
                            </Button>
                        </Form.Group>
                        {error && <Alert variant='danger'>{error}</Alert>}

                        {!error && progress && <ProgressBar now={progress} label={`${progress}%`} />}
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default AddBanner;
