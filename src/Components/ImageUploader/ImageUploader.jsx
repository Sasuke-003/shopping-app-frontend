import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import "./ImageUploader.css";
import { getPopup } from "../../util";
import { api } from "../../server";

function ImageUploader({ product }) {
    const [selectedFiles, setSelectedFiles] = useState([]);

    const uploadImage = () => {
        let formData = new FormData();

        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append("img", selectedFiles[i]);
        }
        formData.append("itemName", product.name);
        axios
            .post("/item/add-image", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .catch((error) => {
                const { code } = error?.response?.data;
                switch (code) {
                    case "FILE_MISSING":
                        getPopup("error", "Please select a file before uploading!");
                        break;
                    default:
                        getPopup("error", "Sorry! Something went wrong. Please try again later");
                        break;
                }
            });
    };

    const submitHandler = async (e) => {
        e.preventDefault(); //prevent the form from submitting
        let err = false;
        if (product.name === "") {
            getPopup("error", "Name cannot be empty");
            return;
        }
        if (product.category === "") {
            getPopup("error", "Name cannot be empty");
            return;
        }
        if (product.description === "") {
            getPopup("error", "Name cannot be empty");
            return;
        }
        product.subDetail.forEach((prdct) => {
            if (prdct.price === 0 || prdct.stock === 0) {
                getPopup("error", "Price or Stock cannot be empty");
                err = true;
                return;
            }
            Object.keys(prdct.selectable).forEach((key) => {
                if (prdct.selectable[key] === "") {
                    getPopup("error", "Please fill up all the empty fields");
                    err = true;
                    return;
                }
            });
        });
        if (err) return;
        if (selectedFiles.length < 1) {
            getPopup("error", "At least one image must be selected");
            return;
        }
        try {
            await api.item.addDetail(product);
            uploadImage();
            getPopup("success", "successfully added " + product.name);
            window.location.reload();
        } catch (e) {
            getPopup("error", e?.response?.data?.info);
        }
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
                        {/* {error && <Alert variant='danger'>{error}</Alert>} */}
                        {/* {!error && progress && <ProgressBar now={progress} label={`${progress}%`} />} */}
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default ImageUploader;
