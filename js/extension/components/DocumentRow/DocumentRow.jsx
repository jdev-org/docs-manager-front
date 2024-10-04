import React from "react";

import { Button } from "react-bootstrap";
import { uniqueId } from "lodash";
import { Glyphicon } from "react-bootstrap";

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

const DocumentRow = ({
    document,
    show,
    consult,
    remove,
    download,
    authorized,
    setOpen = () => {}
}) => {
    const maxTitleLength = 20;
    let {label, id, contentType, opened} = document;
    label = label && label.length > maxTitleLength
            ? `${label.slice(0, maxTitleLength)}...`
            : label;
    
    return (
        <tr>
            <td>
                <ButtonToolTip
                    className="docActionBtn mime-infos"
                    tooltip={contentType}
                >
                    <Glyphicon glyph={iconsByFormat[contentType]} />
                </ButtonToolTip>
            </td>
            <td>{label}</td>
            <td style={{ borderLeft: "grey" }}>
                <ButtonToolTip
                    className="docActionBtn"
                    id={uniqueId("doc_show_")}
                    tooltip="Informations supplémentaires"
                    onClick={() => consult(id)}
                >
                    <Glyphicon glyph="list-alt" />
                </ButtonToolTip>
            </td>
            <td style={{ borderLeft: "grey" }}>
                <ButtonToolTip
                    tooltip="Télécharger"
                    className="docActionBtn"
                    id={uniqueId("doc_show_")}
                    onClick={() => download(id)}
                >
                    <Glyphicon glyph="download-alt" />
                </ButtonToolTip>
            </td>
            <td>
                <ButtonToolTip
                    tooltip="Afficher"
                    className="docActionBtn"
                    id={uniqueId("doc_show_")}
                    onClick={() => show(id)}
                >
                    <Glyphicon glyph="search" />
                </ButtonToolTip>
            </td>
            {authorized && (<td>
                <ButtonToolTip
                    tooltip="Cocher pour que ce document soit ouvert à tous"
                    className="docActionBtn"
                    id={uniqueId("doc_show_")}
                    onClick={() => setOpen(id, !opened)}
                >
                    <Glyphicon glyph={opened ? "eye-open" : "eye-close"} />
                </ButtonToolTip>
            </td>)}
            {authorized && (<td>
                <ButtonToolTip
                    tooltip="Supprimer"
                    className="docActionBtn"
                    id={uniqueId("doc_show_")}
                    onClick={() => remove(id)}
                >
                    <Glyphicon glyph="trash" />
                </ButtonToolTip>
            </td>)}
        </tr>
    );
};

export default DocumentRow;
