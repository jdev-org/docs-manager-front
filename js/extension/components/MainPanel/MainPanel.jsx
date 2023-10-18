import React from "react";

import { Button, Modal, Col, Row } from "react-bootstrap";
import MainPanelBody from "../MainPanelBody/MainPanelBody";
import { Glyphicon } from "react-bootstrap";
import UploadDocument from "../UploadDocument/UploadDocument";
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
                    <Modal.Title>Documents</Modal.Title>
                </Modal.Header>

                <Modal.Body className="docs-modal-body">
                    <Row>
                        {isUpload && (
                            <UploadDocument
                                upload={upload}
                                close={() => setUploadVisibility(false)}
                                fields={fields}
                                statusValues={statusValues}
                                entity={entity}
                                required={required}
                                documents={documents}
                                controlUpload={controlUpload}
                                uploadValidation={uploadValidation}
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
                                    <Glyphicon glyph="plus" /> Nouveau document
                                </Button>
                            </Col>
                        )}
                    </Row>
                </Modal.Body>

                <Modal.Footer>
                    {isUpload && (
                        <Button
                            bsStyle="primary"
                            onClick={() => setUploadVisibility(false)}
                        >
                            Annuler
                        </Button>
                    )}
                    {idToConsult && (
                        <Button
                            bsStyle="warning"
                            onClick={() => setIdToConsult(null)}
                        >
                            Retour
                        </Button>
                    )}
                    {idToDelete && (
                        <Button
                            bsStyle="primary"
                            onClick={() => setIdToConsult(null)}
                        >
                            Annuler
                        </Button>
                    )}

                    <Button onClick={onClose}>Fermer</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
export default MainPanel;
