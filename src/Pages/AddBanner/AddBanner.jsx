import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, ProgressBar, Alert } from "react-bootstrap";
import axios from "axios";
import "./AddBanner.css";
import { getPopup, SERVER_URL } from "../../util";
import { api } from "../../server";

function AddBanner() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [progress, setProgress] = useState();
    const [error, setError] = useState();
    const [banner, setBanner] = useState("");

    const getBanner = async () => {
        try {
            const res = await api.shop.getBanner();
            setBanner(res);
            console.log(res);
        } catch (e) {}
    };

    useEffect(() => {
        getBanner();
    }, []);

    const submitHandler = (e) => {
        e.preventDefault(); //prevent the form from submitting
        if (selectedFiles.length < 1) {
            getPopup("error", "Select Images");
            return;
        }
        let formData = new FormData();
        formData.append("img", selectedFiles[0]);
        //Clear the error message
        setError("");
        axios
            .post("/shop/banner", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress: (data) => {
                    //Set the progress value to show the progress bar
                    setProgress(Math.round((100 * data.loaded) / data.total));
                },
            })
            .then(() => {
                getPopup("success", "Banner successfully set");
                window.location.reload();
            })
            .catch((error) => {
                getPopup("error", error?.response?.data?.info);
            });
    };
    return (
        <Container id='image-uploader__container'>
            <h3 className=''>CURRENT BANNER</h3> <img className='add-banner-banner' src={SERVER_URL + "banner/" + banner} alt='No banner is set' />
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
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default AddBanner;
