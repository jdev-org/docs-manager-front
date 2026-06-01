import React from "react";

import { connect } from "react-redux";
import { isEmpty } from "lodash";
import InformationArea from "../commons/InformationArea";
import Message from "@mapstore/components/I18N/Message";
import {
    deleteDocument as deleteDocumentAction,
    downloadDocument as downloadDocumentAction,
    getDocuments as getDocumentsAction,
    setEntityOnly as setEntityOnlyAction,
    setIdToConsult as setIdToConsultAction,
    setIdToDelete as setIdToDeleteAction,
    showDocument as showDocumentAction,
    updateDocument as updateDocumentAction
} from "@js/extension/stateManagement/actions/actions";
import {
    getApiDocuments,
    getAuthLevel,
    getDocEntityOnly,
    getEntity,
    getIdToConsult,
    getIdToDelete,
    isAdmin as isAdminSelector,
    getFields,
    displayAllUI
} from "@js/extension/stateManagement/selector/selector";
import { Col, Table, Checkbox } from "react-bootstrap";
import Toolbar from "@mapstore/components/misc/toolbar/Toolbar";
import DocumentRow from "../DocumentRow/DocumentRow";

import "./MainPanelBody.css";
import DeleteArea from "../commons/DeleteArea";
import DocumentPanel from "../DocumentPanel/DocumentPanel";

const MainPanelBody = ({
    authorized = false,
    documents = [],
    refresh = () => {},
    deleteDocument = () => {},
    show = () => {},
    download = () => {},
    idToDelete,
    setIdToDelete = () => {},
    setIdToConsult = () => {},
    idToConsult,
    entity = "1",
    setEntityOnly = () => {},
    entityOnly,
    isAdmin,
    update = () => {},
    displayAllCheckbox = false,
    fields
}) => {
    const documentList = Array.isArray(documents) ? documents : [];
    const toolbarButtons = [
        {
            key: "docs-manager-refresh",
            id: "docs-manager-refresh",
            className: "",
            glyph: "repeat",
            text: "",
            bsStyle: "primary",
            tooltipId: "extension.refresh",
            onClick: () => refresh(entity ? { entity: entity } : {})
        }
    ];

    const displayCheckBox =
        displayAllCheckbox && ((isAdmin && entity && isEmpty(documentList)) || (isAdmin && entity));

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

    if (idToConsult) {
        return (
            <DocumentPanel
                isVisible={idToConsult || false}
                doc={documentList.filter((d) => d.id === idToConsult)[0]}
            />
        );
    }

    return (
        <>
            <Col xs={entity ? 10 : 12}>
                <Toolbar
                    id="docs-manager-header-toolbar"
                    buttons={toolbarButtons}
                />
            </Col>
            {displayCheckBox && (
                <Col xs={12} className="text-right">
                    <Checkbox
                        id="docsEntityCheck"
                        checked={
                            entityOnly === null && entity ? true : entityOnly
                        }
                        onChange={(x) => {
                            setEntityOnly(x.target.checked);
                        }}
                    >
                        <Message msgId="extension.entityOnlyCheckbox" />
                    </Checkbox>
                </Col>
            )}
            {entity && isEmpty(documentList) && (
                <InformationArea
                    isVisible
                    msgTitleId="extension.noDocuments"
                    msgId="extension.emptyListSelection"
                    glyph="eye-close"
                />
            )}
            {!entity && !isAdmin && isEmpty(documentList) && (
                <InformationArea
                    isVisible
                    msgTitleId="extension.emptySelection"
                    msgId="extension.selectEntity"
                    glyph="eye-close"
                />
            )}
            {!entity && isAdmin && isEmpty(documentList) && (
                <InformationArea
                    isVisible
                    msgTitleId="extension.noDocuments"
                    msgId="extension.noDocumentsConsult"
                    glyph="eye-close"
                />
            )}

            {!isEmpty(documentList) && (
                <Col xs={12} className="docs-div-table">
                    <Table responsive className="docs-table">
                        <tbody className="docs-tbody">
                            {documentList.map((document) => (
                                <DocumentRow
                                    document={document}
                                    remove={setIdToDelete}
                                    consult={setIdToConsult}
                                    download={download}
                                    show={show}
                                    update={update}
                                    fields={fields}
                                    authorized={authorized}
                                />
                            ))}
                        </tbody>
                    </Table>
                </Col>
            )}
        </>
    );
};
export default connect(
    (state) => ({
        documents: getApiDocuments(state),
        idToDelete: getIdToDelete(state),
        idToConsult: getIdToConsult(state),
        entity: getEntity(state),
        entityOnly: getDocEntityOnly(state),
        isAdmin: isAdminSelector(state),
        authorized: getAuthLevel(state),
        fields: getFields(state),
        displayAllCheckbox: displayAllUI(state)
    }),
    {
        refresh: getDocumentsAction,
        deleteDocument: deleteDocumentAction,
        show: showDocumentAction,
        download: downloadDocumentAction,
        setIdToDelete: setIdToDeleteAction,
        setIdToConsult: setIdToConsultAction,
        setEntityOnly: setEntityOnlyAction,
        update: updateDocumentAction
    }
)(MainPanelBody);
