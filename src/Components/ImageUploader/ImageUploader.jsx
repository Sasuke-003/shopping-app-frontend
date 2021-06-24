import { useState } from "react";
import { Container, Row, Col, Form, Button, ProgressBar, Alert } from "react-bootstrap";
import axios from "axios";
import "./ImageUploader.css";
import { getPopup } from "../../util";

function ImageUploader({ product }) {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [progress, setProgress] = useState();
    const [error, setError] = useState();

    const uploadImage = (i) => {
        let formData = new FormData();

        formData.append("img", selectedFiles[i]);
        //Clear the error message
        setError("");
        axios
            .post("http://localhost:8080/item/add", formData, {
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

    const submitHandler = (e) => {
        e.preventDefault(); //prevent the form from submitting
        // if(product.name === ''){
        //     getPopup('error', 'Name cannot be empty');
        // }
    };
    return (
        <Container id='image-uploader__container'>
            <h3 className='add-product__basic-title'>IMAGES</h3>{" "}
            <Row>
                <Col lg={{ span: 4, offset: 3 }}>
                    <Form action='http://localhost:8081/upload_file' method='post' encType='multipart/form-data' onSubmit={submitHandler}>
                        <Form.Group>
                            <Form.File
                                id='exampleFormControlFile1'
                                label='CHOOSE IMAGES FOR THE PRODUCT'
                                name='file'
                                multiple
                                onChange={(e) => {
                                    setSelectedFiles(e.target.files);
                                }}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Button id='add-product-btn' variant='info' type='submit'>
                                ADD PRODUCT
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

export default ImageUploader;
