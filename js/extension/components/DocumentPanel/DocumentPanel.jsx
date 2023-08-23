import React from "react";

import { Col, FormGroup, Form, ControlLabel } from "react-bootstrap";
import "./DocumentPanel.css";
const DocumentPanel = ({ doc = null, isVisible = false }) => {
    if (!isVisible) return null;
    return (
        <Form horizontal id="doc-attribute-panel">
            { doc?.label && 
                (<FormGroup>
                    <Col componentClass={ControlLabel} sm={3} className="docs-attr-label">
                        Titre :
                    </Col>
                    <Col sm={9}>{doc?.label}</Col>
                </FormGroup>)
            }

            {doc?.comment && (<FormGroup>
                <Col componentClass={ControlLabel} sm={3} className="docs-attr-label">
                    Commentaire :
                </Col>
                <Col sm={9}>{doc?.comment}</Col>
            </FormGroup>)}
            
            {doc?.status && (<FormGroup>
                <Col componentClass={ControlLabel} sm={3} className="docs-attr-label">
                    Statut :
                </Col>
                <Col sm={9}>{doc?.status}</Col>
            </FormGroup>)}

            {doc?.dateDoc && (<FormGroup>
                <Col componentClass={ControlLabel} sm={3} className="docs-attr-label">
                    Date de création :
                </Col>
                <Col sm={9}>{doc?.dateDoc}</Col>
            </FormGroup>)}
        </Form>
    );
};

export default DocumentPanel;
