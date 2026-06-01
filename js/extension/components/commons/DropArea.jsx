import React, {useState} from "react";
import Dropzone from "react-dropzone";
import { Glyphicon } from "react-bootstrap";
import { Col } from "react-bootstrap";
import Message from "@mapstore/components/I18N/Message";

const DropArea = ({
    onDrop = () => { },
    className = "",
    label = ""
}) => {
    
    return (
        <Dropzone
            key="dropzone"
            rejectClassName="alert-danger"
            className={`alert alert-info col-xs-12 ${className}`}
            onDrop={onDrop}
            style={{
                margin: "0px !important",
                borderStyle: "dashed",
                borderWidth: "3px",
                transition: "all 0.3s ease-in-out",
            }}
            activeStyle={{
                backgroundColor: "#eee",
                borderWidth: "5px",
                boxShadow: "0px 0px 25px 14px #d9edf7",
            }}
        >
            <Col xs={12} className="text-center">
                <div>
                    <Glyphicon glyph="upload" style={{ paddingRight: "5px" }} />
                    <p>
                        <Message msgId="extension.dragFilesHint" />
                    </p>
                    {label &&( <p>{label}</p>)}
                </div>
            </Col>
        </Dropzone>
    );
};

export default DropArea;
