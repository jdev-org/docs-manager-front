import React from "react";

import { Button } from "react-bootstrap";
import { uniqueId } from "lodash";
import { Glyphicon } from "react-bootstrap";
import moment from "moment";

import "./DocumentRow.css";

import tooltip from "@mapstore/components/misc/enhancers/tooltip";
import ButtonRB from "@mapstore/components/misc/Button";
const ButtonToolTip = tooltip(ButtonRB);

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
            <td>{props.status}</td>
            <td>{props?.dateDoc && moment(props.dateDoc,"YYYY-MM-DD").format("DD/MM/YYYY")}</td>
            <td>
                {props?.comment && (
                    <ButtonToolTip
                        style={{ textDecoration: "none" }}
                        bsStyle="link"
                        tooltip={props.comment}
                    >
                        <Glyphicon glyph="comment" />
                    </ButtonToolTip>
                )}
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
