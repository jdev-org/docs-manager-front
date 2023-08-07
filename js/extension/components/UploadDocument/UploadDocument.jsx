import React from "react";
import DropArea from "../commons/DropArea";
import { Col, FormGroup, FormControl, HelpBlock } from "react-bootstrap";

import "./UploadDocument.css";

const UploadDocument = ({ upload = () => {} }) => {
    return (
        <>
            <Col xs={12}>
                <h4>Sélectionner un document depuis votre ordinateur :</h4>
            </Col>
            <Col xs={12}>
                <DropArea saveFile={(f) => upload(f[0])} />
            </Col>
            <Col xs={12}>
                <h4>Titre du document :</h4>
            </Col>
            <Col xs={12}>
                <form>
                    <FormGroup
                        controlId="formBasicText"
                        validationState={() => {}}
                    >
                        <FormControl
                            type="text"
                            placeholder="document.pdf"
                            onChange={() => {}}
                        />
                        <FormControl.Feedback />
                        <HelpBlock>
                            Le libellé doit être unique.
                            La taille du fichier ne doit pas dépasser 50 Mo.
                        </HelpBlock>
                    </FormGroup>
                </form>
            </Col>
        </>
    );
};
export default UploadDocument;
