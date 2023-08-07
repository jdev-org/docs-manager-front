import React from "react";

import { Button } from "react-bootstrap";
import { uniqueId } from "lodash";
import { Glyphicon } from "react-bootstrap";

import "./DocumentRow.css";

const DocumentRow = (props) => {
    return (
        <tr>
            <td>{props.name}</td>
            <td>
                <Button className="docActionBtn" id={uniqueId("doc_show_")} onClick={() => props.download(props.id)}>
                    <Glyphicon glyph="download-alt" />
                </Button>
            </td>
            <td>
                <Button className="docActionBtn" id={uniqueId("doc_show_")} onClick={() => props.show(props.id)}>
                    <Glyphicon glyph="eye-open" />
                </Button>
            </td>
            <td>
                <Button className="docActionBtn" id={uniqueId("doc_show_")} onClick={() => props.deleteDocument(props.id)}>
                    <Glyphicon glyph="trash" />
                </Button>
            </td>
        </tr>
    );
};

export default DocumentRow;
