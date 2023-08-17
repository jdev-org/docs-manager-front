import React from "react";

import { Button, Modal, Col, Row } from "react-bootstrap";
import MainPanelBody from "../MainPanelBody/MainPanelBody";
import { Glyphicon } from "react-bootstrap";
import UploadDocument from "../UploadDocument/UploadDocument";
import "./MainPanel.css";

const MainPanel = ({
    active = false,
    onClose = () => {},
    isUpload,
    upload,
    setUploadVisibility,
    fields,
    statusValues,
    required,
    entity,
    documents,
}) => {
    if (!active) return null;

    return (
        <div className="static-modal">
            <Modal show={active} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Documents</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Row>
                        {isUpload ? (
                            <UploadDocument
                                upload={upload}
                                close={() => setUploadVisibility(false)}
                                fields={fields}
                                statusValues={statusValues}
                                entity={entity}
                                required={required}
                                documents={documents}
                            />
                        ) : (
                            <>
                                <MainPanelBody />
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
                                        <Glyphicon glyph="plus" /> Nouveau
                                        document
                                    </Button>
                                </Col>
                            </>
                        )}
                    </Row>
                </Modal.Body>

                <Modal.Footer>
                    {isUpload && (
                        <Button onClick={() => setUploadVisibility(false)}>
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
