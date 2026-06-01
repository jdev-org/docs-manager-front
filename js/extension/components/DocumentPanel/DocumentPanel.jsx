import React from "react";

import { Col, FormGroup, Form, ControlLabel } from "react-bootstrap";
import Message from "@mapstore/components/I18N/Message";
import "./DocumentPanel.css";
const DocumentPanel = ({ doc = null, isVisible = false }) => {
    if (!isVisible) return null;
    return (
        <Col xs={12}>
        <Form horizontal id="doc-attribute-panel">
            { doc?.label && 
                (<FormGroup>
                    <Col componentClass={ControlLabel} sm={3} className="docs-attr-label">
                        <Message msgId="extension.title" />
                    </Col>
                    <Col sm={9}>{doc?.label}</Col>
                </FormGroup>)
            }

            {doc?.comment && (<FormGroup>
                <Col componentClass={ControlLabel} sm={3} className="docs-attr-label">
                    <Message msgId="extension.comment" />
                </Col>
                <Col sm={9}>{doc?.comment}</Col>
            </FormGroup>)}
            
            {doc?.status && (<FormGroup>
                <Col componentClass={ControlLabel} sm={3} className="docs-attr-label">
                    <Message msgId="extension.status" />
                </Col>
                <Col sm={9}>{doc?.status}</Col>
            </FormGroup>)}

            {doc?.dateDoc && (<FormGroup>
                <Col componentClass={ControlLabel} sm={3} className="docs-attr-label">
                    <Message msgId="extension.dateDoc" />
                </Col>
                <Col sm={9}>{doc?.dateDoc}</Col>
            </FormGroup>)}
            </Form>
        </Col>
    );
};

export default DocumentPanel;
