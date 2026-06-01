import React, {
    useState,
    useEffect,
    useImperativeHandle,
    forwardRef,
} from "react";
import DropArea from "../commons/DropArea";
import { isEmpty } from "lodash";

import {
    Col,
    FormGroup,
    FormControl,
    HelpBlock,
    ControlLabel,
} from "react-bootstrap";
import { Glyphicon, Checkbox } from "react-bootstrap";
import { DropdownList } from "react-widgets";

import { DateTimePicker } from "react-widgets";

import moment from "moment";
import momentLocalizer from "react-widgets/lib/localizers/moment";
import Message from "@mapstore/components/I18N/Message";
momentLocalizer(moment);

import "./UploadDocument.css";
import SearchText from "../commons/SearchText";

const UploadDocument = forwardRef(({
    upload = () => {},
    statusValues,
    fields,
    required,
    controlUpload = () => {},
    uploadValidation,
    onValidityChange = () => {},
}, ref) => {
    const [file, setFile] = useState(null);
    const [label, setLabel] = useState("");
    const [comment, setComment] = useState("");
    const [status, setStatus] = useState("");
    const [dateDoc, setDateDoc] = useState("");
    const [inputStart, setInputStart] = useState(false);
    const [opened, setOpened] = useState(false);

    const isValidLabel = () => {
        if (!inputStart) return true;
        if (!label || !label.length || !uploadValidation?.label) {
            return false;
        }
        return true;
    };

    const isValid = () => {
        if (!inputStart) return true;
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

    const displayStatus = !isEmpty(statusValues?.values);

    const handleUpload = () =>
        upload(file, {
            label: label,
            comment: comment,
            status: status,
            dateDoc: dateDoc ? moment(dateDoc).format("YYYY-MM-DD") : "",
            opened: opened,
        });

    const canSubmit = isValid() && isValidLabel();

    useEffect(() => {
        onValidityChange(canSubmit);
    }, [canSubmit, onValidityChange]);

    useImperativeHandle(
        ref,
        () => ({
            submit: () => {
                if (canSubmit) {
                    handleUpload();
                }
            },
        }),
        [canSubmit, handleUpload]
    );

    return (
        <div className="docs-upload-form">
            <Col xs={12} className="section">
                <h4><Message msgId="extension.selectDocument" /></h4>
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
                    <Message msgId="extension.fileSizeLimit" />
                </HelpBlock>
                {!isValidLabel() && (
                    <HelpBlock className={"docs-invalid"}>
                        <Glyphicon
                            style={{ marginRight: "5px" }}
                            glyph={"alert"}
                        />
                        <Message msgId="extension.labelValidation" />
                    </HelpBlock>
                )}
            </Col>
            <div>
                <Col xs={12} className="section">
                    <h4><Message msgId="extension.documentInfo" /></h4>
                </Col>
                <Col xs={12}>
                    <form>
                        <FormGroup id="docsFromGroup">
                            {fields.includes("opened") && (
                                <Col xs={12}>
                                    
                                    <Checkbox 
                                        id="openedCheckbox"
                                        checked={opened}
                                        onChange={() => setOpened(!opened)}
                                        ><Message msgId="extension.documentOpenCheckbox" /></Checkbox>
                                    
                                </Col>
                            )}
                            {fields.includes("label") && (
                                <Col xs={6}>
                                    <ControlLabel><Message msgId="extension.title" /></ControlLabel>
                                    <SearchText
                                        className={
                                            isValidLabel() ? "" : "docs-invalid"
                                        }
                                        value={label}
                                        placeholder="document.pdf"
                                        search={(x) => {
                                            controlUpload({ label: x });
                                        }}
                                        onChange={(x) => {
                                            setInputStart(true);
                                            setLabel(x);
                                        }}
                                    />
                                </Col>
                            )}
                            {fields.includes("comment") && (
                                <Col xs={6}>
                                    <ControlLabel><Message msgId="extension.commentLabel" /></ControlLabel>
                                    <FormControl
                                        type="text"
                                        placeholder="Information complémentaire..."
                                        value={comment}
                                        onChange={(x) => {
                                            setComment(x.target.value);
                                        }}
                                    />
                                </Col>
                            )}
                            {(fields.includes("status") && displayStatus) && (
                                <Col xs={6}>
                                    <ControlLabel><Message msgId="extension.status" /></ControlLabel>
                                    <DropdownList
                                        data={statusValues.values}
                                        value={status}
                                        placeholder="Statut du document..."
                                        onChange={(v) => setStatus(v)}
                                    />
                                </Col>
                            )}

                            {fields.includes("dateDoc") && (
                                <Col xs={6}>
                                    <ControlLabel>
                                        <Message msgId="extension.dateDocLabel" />
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
                                </Col>
                            )}

                            <FormControl.Feedback />
                        </FormGroup>
                    </form>
                </Col>
            </div>
        </div>
    );
});
export default UploadDocument;
