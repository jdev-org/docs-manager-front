import React from "react";

import { connect } from "react-redux";
import { isEmpty } from "lodash";
import InformationArea from "../commons/InformationArea";
import {
    deleteDocument,
    downloadDocument,
    getDocuments,
    showDocument,
    uploadDocument
} from "@js/extension/stateManagement/actions/actions";
import { getDocuments as getPluginDocuments, getUploadVisibility } from "@js/extension/stateManagement/selector/selector";
import { Button, Row, Col, Table } from "react-bootstrap";
import Toolbar from "@mapstore/components/misc/toolbar/Toolbar";
import DocumentRow from "../DocumentRow/DocumentRow";

import "./MainPanelBody.css";

const MainPanelBody = ({
    documents = [],
    refresh = () => {},
    deleteDocument = () => {},
    show = () => {},
    download = () => { },
    uploadVisibility
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
                    <Col xs={12}>
                        <Table responsive className="docs-table">
                            <tbody className="docs-tbody">
                                {documents.map((document) => {
                                    let docProps = {
                                        deleteDocument,
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
        documents: getPluginDocuments(state),
        uploadVisibility: getUploadVisibility(state)
    }),
    {
        refresh: getDocuments,
        upload: uploadDocument,
        deleteDocument: deleteDocument,
        show: showDocument,
        download: downloadDocument,
    }
)(MainPanelBody);
