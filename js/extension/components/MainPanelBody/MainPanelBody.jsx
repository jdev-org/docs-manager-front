import React, { useState } from "react";

import { connect } from "react-redux";
import { isEmpty } from "lodash";
import InformationArea from "../commons/InformationArea";
import {
    deleteDocument,
    downloadDocument,
    getDocuments,
    setIdToDelete,
    showDocument,
    uploadDocument,
} from "@js/extension/stateManagement/actions/actions";
import {
    getApiDocuments,
    getIdToDelete,
    getUploadVisibility,
} from "@js/extension/stateManagement/selector/selector";
import { Button, Row, Col, Table } from "react-bootstrap";
import Toolbar from "@mapstore/components/misc/toolbar/Toolbar";
import DocumentRow from "../DocumentRow/DocumentRow";

import "./MainPanelBody.css";
import DeleteArea from "../commons/DeleteArea";

const MainPanelBody = ({
    documents = [],
    refresh = () => {},
    deleteDocument = () => {},
    show = () => {},
    download = () => { },
    idToDelete,
    setIdToDelete = () => {}
}) => {
    const toolbarButtons = [
        {
            key: "docs-manager-refresh",
            id: "docs-manager-refresh",
            className: "",
            glyph: "repeat",
            text: "",
            bsStyle: "primary",
            tooltipId: "extension.refresh",
            onClick: () => refresh(),
        },
    ];

    if (idToDelete) {
        return (
            <DeleteArea
                isVisible={idToDelete || false}
                confirm={() => {
                    deleteDocument(idToDelete);
                }}
                cancel={() => {
                    setIdToDelete(null);
                }}
            />
        );
    }

    return (
        <>
            {isEmpty(documents) && (
                <InformationArea
                    isVisible
                    title="Aucun document"
                    message="La liste des documents est vide."
                    glyph="eye-close"
                />
            )}
            {!isEmpty(documents) && (
                <>
                    <Col xs={12}>
                        <Toolbar
                            id="docs-manager-header-toolbar"
                            buttons={toolbarButtons}
                        />
                    </Col>
                    <Col xs={12} className="docs-div-table">
                        <Table responsive className="docs-table">
                            <tbody className="docs-tbody">
                                {documents.map((document) => {
                                    let docProps = {
                                        deleteDocument: (id) =>
                                            setIdToDelete(id),
                                        show,
                                        download,
                                        ...document,
                                    };
                                    return <DocumentRow {...docProps} />;
                                })}
                            </tbody>
                        </Table>
                    </Col>
                </>
            )}
        </>
    );
};
export default connect(
    (state) => ({
        documents: getApiDocuments(state),
        idToDelete: getIdToDelete(state),
    }),
    {
        refresh: getDocuments,
        deleteDocument: deleteDocument,
        show: showDocument,
        download: downloadDocument,
        setIdToDelete: setIdToDelete,
    }
)(MainPanelBody);
