import React from "react";

import { connect } from "react-redux";
import InformationArea from "../commons/InformationArea";
import {
    deleteDocument,
    downloadDocument,
    getDocuments,
    setEntityOnly,
    setIdToConsult,
    setPaginationInfos,
    setIdToDelete,
    showDocument,
    updateDocument
} from "@js/extension/stateManagement/actions/actions";
import {
    getApiDocuments,
    getAuthLevel,
    getDocEntityOnly,
    getEntity,
    getIdToConsult,
    getIdToDelete,
    isAdmin,
    getFields,
    displayAllUI,
    getPaginationInfos,
    isActive
} from "@js/extension/stateManagement/selector/selector";
import { Col, Table, Checkbox, Pagination } from "react-bootstrap";
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
    setPaginationInfos = () => {},
    idToConsult,
    paginationInfos,
    entity = "1",
    setEntityOnly = () => {},
    entityOnly,
    isAdmin,
    update = () => {},
    displayAllCheckbox = true,
    fields
}) => {
    const defaultPagination = { page: 1, size: 10, sort: "label" };
    const pagination = { ...defaultPagination, ...(paginationInfos || {}) };
    const content = documents?.content || [];
    const hasDocuments = content.length > 0;
    const apiCurrentPage = Number.isInteger(documents?.currentPage)
        ? documents.currentPage
        : pagination.page - 1;
    const resolvedApiPage = Number.isFinite(apiCurrentPage) ? apiCurrentPage : 0;
    const currentPage = Math.max(resolvedApiPage + 1, 1);
    const totalPages = Number.isInteger(documents?.totalPages)
        ? documents.totalPages
        : hasDocuments
            ? 1
            : 0;
    const safeActivePage = totalPages ? Math.min(currentPage, totalPages) : currentPage;

    const buildRefreshParams = (overrides = {}) => {
        const merged = { ...pagination, ...overrides };
        const uiPage = merged.page || defaultPagination.page;
        const apiPage = Math.max(uiPage - 1, 0);

        return {
            ...merged,
            page: apiPage,
            ...(entity ? { entity } : {}),
        };
    };

    const refreshWithPagination = (params = {}) => {
        refresh(buildRefreshParams(params));
    };

    const toolbarButtons = [
        {
            key: "docs-manager-refresh",
            id: "docs-manager-refresh",
            className: "",
            glyph: "repeat",
            text: "",
            bsStyle: "primary",
            tooltipId: "extension.refresh",
            onClick: () => refreshWithPagination(),
        },
    ];

    // Usefull checkbox to switch between selected entity's docs and all docs
    const displayCheckBox = displayAllCheckbox && isAdmin && entity;

    const onPageChange = (eventKey) => {
        const selectedPage = Number(eventKey);
        if (!selectedPage || selectedPage === currentPage) {
            return;
        }
        const updatedPagination = { ...pagination, page: selectedPage };
        setPaginationInfos(updatedPagination);
        refreshWithPagination({ page: selectedPage });
    };

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
        const selectedDocument = content.find((d) => d.id === idToConsult);
        return (
            <DocumentPanel
                isVisible={idToConsult || false}
                doc={selectedDocument}
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
                        Voir les documents de la sélection
                    </Checkbox>
                </Col>
            )}
            {entity && !hasDocuments && (
                <InformationArea
                    isVisible
                    title="Aucun document"
                    message="La liste des documents est vide pour cette sélection."
                    glyph="eye-close"
                />
            )}
            {!entity && !isAdmin && !hasDocuments && (
                <InformationArea
                    isVisible
                    title="Sélection vide !"
                    message="Commencez par cliquer sur une entité pour voir ses documents"
                    glyph="eye-close"
                />
            )}
            {!entity && isAdmin && !hasDocuments && (
                <InformationArea
                    isVisible
                    title="Aucun document !"
                    message="Il n'y a aucun document à consulter."
                    glyph="eye-close"
                />
            )}

            {hasDocuments && (
                <Col xs={12} className="docs-div-table">
                    <Table responsive className="docs-table">
                        <tbody className="docs-tbody">
                            {content.map((document) => {
                                return (
                                    <DocumentRow
                                        key={document?.id}
                                        document={document}
                                        remove={setIdToDelete}
                                        consult={setIdToConsult}
                                        download={download}
                                        show={show}
                                        update={update}
                                        fields={fields}
                                        authorized={authorized}
                                    />
                                );
                            })}
                        </tbody>
                    </Table>
                </Col>
            )}
            {hasDocuments && totalPages > 1 && (
                <Col xs={12} className="docs-div-pagination">
                    <Pagination
                        bsSize="small"
                        prev
                        next
                        first
                        last
                        ellipsis
                        boundaryLinks
                        maxButtons={8}
                        items={totalPages}
                        activePage={safeActivePage}
                        onSelect={onPageChange}
                    />
                </Col>
            )}
            
        </>
    );
};
export default connect(
    (state) => ({
        isActive: isActive(state),
        documents: getApiDocuments(state),
        idToDelete: getIdToDelete(state),
        idToConsult: getIdToConsult(state),
        entity: getEntity(state),
        entityOnly: getDocEntityOnly(state),
        isAdmin: isAdmin(state),
        authorized: getAuthLevel(state),
        fields: getFields(state),
        displayAllCheckbox: displayAllUI(state),
        paginationInfos: getPaginationInfos(state)
    }),
    {
        refresh: getDocuments,
        deleteDocument: deleteDocument,
        show: showDocument,
        download: downloadDocument,
        setIdToDelete: setIdToDelete,
        setIdToConsult: setIdToConsult,
        setPaginationInfos: setPaginationInfos,
        setEntityOnly: setEntityOnly,
        update: updateDocument
    }
)(MainPanelBody);
