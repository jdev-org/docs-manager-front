import React from "react";

import { Button, Modal } from "react-bootstrap";
import MainPanelBody from "../MainPanelBody/MainPanelBody";

const MainPanel = ({ active = false, onClose = () => {} }) => {
    if (!active) return null;

    return (
        <div className="static-modal">
            <Modal show={active} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Documents</Modal.Title>
                </Modal.Header>

                <Modal.Body><MainPanelBody/></Modal.Body>

                <Modal.Footer>
                    <Button onClick={onClose}>Close</Button>
                    <Button bsStyle="primary">Save changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
export default MainPanel;
