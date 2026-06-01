import React, { useState } from "react";
import { isEmpty } from "lodash";

import {
    Button, Col
} from "react-bootstrap";
import { Glyphicon } from "react-bootstrap";
import InformationArea from "./InformationArea";
import Message from '@mapstore/components/I18N/Message';

const DeleteArea = ({isVisible, confirm, cancel}) => {
    return (
        <div className="docs-delete-confirm">
            <InformationArea
                style={{margin: "10% auto"}}
                isVisible={isVisible}
                title=""
                msgId="extension.confirmDelete"
                glyph="trash"
            />
            <Col xs={12}>
                <Button block bsStyle="danger" bsSize="md" onClick={confirm}>
                    <Message msgId="extension.deleteButton" />
                </Button>
            </Col>
        </div>
    );
};
export default DeleteArea;
