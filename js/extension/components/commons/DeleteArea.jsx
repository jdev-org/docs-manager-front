import React, { useState } from "react";
import { isEmpty } from "lodash";

import {
    Button, Col
} from "react-bootstrap";
import { Glyphicon } from "react-bootstrap";
import InformationArea from "./InformationArea";

const DeleteArea = ({isVisible, confirm, cancel}) => {
    return (
        <div className="docs-delete-confirm">
            <InformationArea
                style={{margin: "15% auto"}}
                isVisible={isVisible}
                title=""
                message="Souhaitez-vous supprimer ce document ?"
                glyph="trash"
            />
            <Col xs={6}>
                <Button block bsStyle="danger" bsSize="md" onClick={confirm}>Supprimer</Button>
            </Col>
            <Col xs={6}>
                <Button block bsStyle="primary" bsSize="md" onClick={cancel}>Annuler</Button>
            </Col>
        </div>
    );
};
export default DeleteArea;
