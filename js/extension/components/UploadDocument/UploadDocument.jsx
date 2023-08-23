import React, { useState } from "react";
import DropArea from "../commons/DropArea";
import { isEmpty } from "lodash";

import {
    Col,
    FormGroup,
    FormControl,
    HelpBlock,
    Button,
    ControlLabel,
} from "react-bootstrap";
import { Glyphicon } from "react-bootstrap";
import { DropdownList } from "react-widgets";

import { DateTimePicker } from "react-widgets";

import moment from "moment";
import momentLocalizer from "react-widgets/lib/localizers/moment";
momentLocalizer(moment);

import "./UploadDocument.css";
import SearchText from "../commons/SearchText";

const UploadDocument = ({
    upload = () => {},
    statusValues,
    fields,
    required,
    documents = [],
    controlUpload = () => { },
    uploadValidation
}) => {
    const [file, setFile] = useState(null);
    const [label, setLabel] = useState("");
    const [comment, setComment] = useState("");
    const [status, setStatus] = useState("");
    const [dateDoc, setDateDoc] = useState("");

    const isValid = () => {
        const requiredMissing = [];
        required.map((f) => {
            if (f == "label" && !label) requiredMissing.push("label");
            if (f == "comment" && !comment) requiredMissing.push("comment");
            if (!file) requiredMissing.push("file");
            if (f == "status" && !status) requiredMissing.push("status");
            if (f == "dateDoc" && !dateDoc) requiredMissing.push("dateDoc");
        });
        return isEmpty(requiredMissing);
    };
    return (
        <div className="docs-upload-form">
            <Col xs={12}>
                <h4>Sélectionner un document depuis votre ordinateur :</h4>
            </Col>
            <Col xs={12} className="docs-drop-area">
                <DropArea
                    label={(file && file?.name) || ""}
                    onDrop={(f) => {
                        setFile(f[0]);
                        setLabel(f[0]?.name);
                    }}
                />
                <HelpBlock>
                    <Glyphicon
                        style={{ marginRight: "5px" }}
                        glyph={"info-sign"}
                    />
                    La taille du fichier ne doit pas dépasser 50 Mo.
                </HelpBlock>
            </Col>
            <div>
                <Col xs={12}>
                    <h4>Informations sur le document :</h4>
                </Col>
                <Col xs={12}>
                    <form>
                        <FormGroup
                            controlId="formBasicText"
                            validationState={() => {}}
                        >
                            {fields.includes("label") && (
                                <>
                                    <ControlLabel>Titre :</ControlLabel>
                                    <SearchText
                                        className={
                                            uploadValidation?.label ? "" : "docs-invalid"
                                        }
                                        value={label}
                                        placeholder="document.pdf"

                                        search={(x) => {
                                            controlUpload({label: x});
                                        }}
                                        onChange={setLabel}
                                    />
                                    {!uploadValidation?.label && (
                                        <HelpBlock className={"docs-invalid"}>
                                            <Glyphicon
                                                style={{ marginRight: "5px" }}
                                                glyph={"alert"}
                                            />
                                            Le libellé doit être unique et d'au
                                            moins 3 caractères.
                                        </HelpBlock>
                                    )}
                                </>
                            )}
                            {fields.includes("comment") && (
                                <>
                                    <ControlLabel>Commentaire:</ControlLabel>
                                    <FormControl
                                        type="text"
                                        placeholder="Information complémentaire..."
                                        value={comment}
                                        onChange={(x) => {
                                            setComment(x.target.value);
                                        }}
                                    />
                                </>
                            )}
                            {fields.includes("status") && (
                                <>
                                    <ControlLabel>Statut :</ControlLabel>
                                    <DropdownList
                                        data={statusValues.values}
                                        value={status}
                                        placeholder="Statut du document..."
                                        onChange={(v) => setStatus(v)}
                                    />
                                </>
                            )}

                            {fields.includes("dateDoc") && (
                                <>
                                    <ControlLabel>
                                        Date du document:
                                    </ControlLabel>
                                    <DateTimePicker
                                        type="date"
                                        dropUp
                                        placeholder="Date du document..."
                                        value={
                                            dateDoc ? new Date(dateDoc) : null
                                        }
                                        time={false}
                                        culture="fr"
                                        format="DD/MM/YYYY"
                                        onSelect={(v) => setDateDoc(v)}
                                        onChange={(v) => setDateDoc(v)}
                                    />
                                </>
                            )}

                            <FormControl.Feedback />
                        </FormGroup>
                    </form>
                </Col>
                <Col xs={12}>
                    <Button
                        className={isValid() && uploadValidation?.label ? "" : "disabled"}
                        block
                        onClick={() =>
                            isValid()
                                ? upload(file, {
                                      label: label,
                                      comment: comment,
                                      status: status,
                                      dateDoc: dateDoc
                                          ? moment(dateDoc).format("YYYY-MM-DD")
                                          : "",
                                  })
                                : null
                        }
                    >
                        <Glyphicon style={{ marginRight: "5px" }} glyph="ok" />
                        Valider
                    </Button>
                </Col>
            </div>
        </div>
    );
};
export default UploadDocument;
