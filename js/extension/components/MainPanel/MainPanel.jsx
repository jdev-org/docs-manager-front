import React, { useRef, useState } from "react";

import { Button, Modal, Col, Row } from "react-bootstrap";
import MainPanelBody from "../MainPanelBody/MainPanelBody";
import { Glyphicon } from "react-bootstrap";
import UploadDocument from "../UploadDocument/UploadDocument";
import Message from "@mapstore/components/I18N/Message";
import "./MainPanel.css";

const MainPanel = ({
    active = false,
    authorized = false,
    onClose = () => {},
    isUpload,
    upload,
    setUploadVisibility,
    fields,
    statusValues,
    required,
    entity,
    documents,
    idToDelete,
    idToConsult,
    controlUpload,
    uploadValidation,
    setIdToConsult
}) => {
    const uploadDocumentRef = useRef(null);
    const [isUploadValid, setIsUploadValid] = useState(false);

    if (!active) return null;

    return (
        <div className="static-modal">
            <Modal
                className="docs-modal"
                show={active}
                onHide={onClose}
                bsSize="large"
                backdrop="static"
                aria-labelledby="contained-modal-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title><Message msgId="extension.documentsModal" /></Modal.Title>
                </Modal.Header>

                <Modal.Body className="docs-modal-body">
                    <Row>
                        {isUpload && (
                            <UploadDocument
                                ref={uploadDocumentRef}
                                upload={upload}
                                close={() => setUploadVisibility(false)}
                                fields={fields}
                                statusValues={statusValues}
                                entity={entity}
                                required={required}
                                documents={documents}
                                controlUpload={controlUpload}
                                uploadValidation={uploadValidation}
                                onValidityChange={setIsUploadValid}
                            />
                        )}

                        {!isUpload && <MainPanelBody />}

                        {(authorized && !isUpload && !idToDelete && !idToConsult) && (
                            <Col
                                xs={12}
                                className={"text-right docs-add-btn-div"}
                            >
                                <Button
                                    id="docs-manager-upload"
                                    bsStyle="primary"
                                    onClick={() =>
                                        setUploadVisibility(!isUpload)
                                    }
                                >
                                    <Glyphicon glyph="plus" /> <Message msgId="extension.newDocument" />
                                </Button>
                            </Col>
                        )}
                    </Row>
                </Modal.Body>

                <Modal.Footer>
                    {isUpload && (
                        <>
                            <Button
                                bsStyle={isUploadValid ? "success" : "default"}
                                disabled={!isUploadValid}
                                onClick={() => uploadDocumentRef.current?.submit()}
                            >
                                <Glyphicon style={{ marginRight: "5px" }} glyph="ok" />
                                <Message msgId="extension.validate" />
                            </Button>
                            <Button
                                bsStyle="primary"
                                onClick={() => setUploadVisibility(false)}
                            >
                                <Message msgId="extension.back" />
                            </Button>
                        </>
                    )}
                    {idToConsult && (
                        <Button
                            bsStyle="warning"
                            onClick={() => setIdToConsult(null)}
                        >
                            <Message msgId="extension.back" />
                        </Button>
                    )}
                    {idToDelete && (
                        <Button
                            bsStyle="primary"
                            onClick={() => setIdToConsult(null)}
                        >
                            <Message msgId="extension.cancel" />
                        </Button>
                    )}

                    <Button onClick={onClose}>Fermer</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
export default MainPanel;
