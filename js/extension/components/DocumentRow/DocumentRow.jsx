import React from "react";

import { Button } from "react-bootstrap";
import { uniqueId } from "lodash";
import { Glyphicon } from "react-bootstrap";

import "./DocumentRow.css";

const iconsByFormat = {
    "application/pdf": "1-pdf",
    "vnd.oasis.opendocument.text": "ext-txt",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        "grid-regular",
    "image/png": "picture",
    "text/csv": "grid-regular",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        "ext-txt",
    "image/jpeg": "picture",
    "application/json": "ext-json",
    "application/vnd.oasis.opendocument.text": "ext-txt", // odt
    "application/vnd.oasis.opendocument.spreadshee": "ext-txt", //ods
    "application/zip": "folder-close",
    "application/x-7z-compressed": "folder-close", //.7z
};

const DocumentRow = (props) => {
    return (
        <tr>
            <td>
                <Glyphicon glyph={iconsByFormat[props.contentType]} />
            </td>
            <td>{props.label}</td>
            <td style={{ borderLeft: "grey" }}>
                <Button
                    className="docActionBtn"
                    id={uniqueId("doc_show_")}
                    onClick={() => props.showAttributes(props.id)}
                >
                    <Glyphicon glyph="list-alt" />
                </Button>
            </td>
            <td style={{ borderLeft: "grey" }}>
                <Button
                    className="docActionBtn"
                    id={uniqueId("doc_show_")}
                    onClick={() => props.download(props.id)}
                >
                    <Glyphicon glyph="download-alt" />
                </Button>
            </td>
            <td>
                <Button
                    className="docActionBtn"
                    id={uniqueId("doc_show_")}
                    onClick={() => props.show(props.id)}
                >
                    <Glyphicon glyph="eye-open" />
                </Button>
            </td>
            <td>
                <Button
                    className="docActionBtn"
                    id={uniqueId("doc_show_")}
                    onClick={() => props.deleteDocument(props.id)}
                >
                    <Glyphicon glyph="trash" />
                </Button>
            </td>
        </tr>
    );
};

export default DocumentRow;
