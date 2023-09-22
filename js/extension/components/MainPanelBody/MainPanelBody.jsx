import React, { useState } from "react";

import { connect } from "react-redux";
import { isEmpty } from "lodash";
import InformationArea from "../commons/InformationArea";
import {
    deleteDocument,
    downloadDocument,
    getDocuments,
    setEntityOnly,
    setIdToConsult,
    setIdToDelete,
    showDocument,
} from "@js/extension/stateManagement/actions/actions";
import {
    getApiDocuments,
    getDocEntityOnly,
    getEntity,
    getIdToConsult,
    getIdToDelete,
    isAdmin,
} from "@js/extension/stateManagement/selector/selector";
import { Col, Table, Checkbox } from "react-bootstrap";
import Toolbar from "@mapstore/components/misc/toolbar/Toolbar";
import DocumentRow from "../DocumentRow/DocumentRow";

import "./MainPanelBody.css";
import DeleteArea from "../commons/DeleteArea";
import DocumentPanel from "../DocumentPanel/DocumentPanel";

const MainPanelBody = ({
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
            onClick: () => refresh(entity ? { entity: entity } : {}),
        },
    ];

    const displayCheckBox =
        (isAdmin && entity && isEmpty(documents)) || (isAdmin && entity);

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
                doc={documents.filter((d) => d.id === idToConsult)[0]}
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
            {entity && isEmpty(documents) && (
                <InformationArea
                    isVisible
                    title="Aucun document"
                    message="La liste des documents est vide pour cette sélection."
                    glyph="eye-close"
                />
            )}
            {!entity && !isAdmin && isEmpty(documents) && (
                <InformationArea
                    isVisible
                    title="Sélection vide !"
                    message="Commencez par cliquer sur une entité pour voir ses documents"
                    glyph="eye-close"
                />
            )}
            {!entity && isAdmin && isEmpty(documents) && (
                <InformationArea
                    isVisible
                    title="Aucun document !"
                    message="Il n'y a aucun document à consulter."
                    glyph="eye-close"
                />
            )}

            {!isEmpty(documents) && (
                <Col xs={12} className="docs-div-table">
                    <Table responsive className="docs-table">
                        <tbody className="docs-tbody">
                            {documents.map((document) => {
                                let docProps = {
                                    deleteDocument: (id) => {
                                        setIdToDelete(id);
                                    },
                                    show,
                                    download,
                                    showAttributes: (id) => setIdToConsult(id),
                                    ...document,
                                };
                                return <DocumentRow {...docProps} />;
                            })}
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
        isAdmin: isAdmin(state),
    }),
    {
        refresh: getDocuments,
        deleteDocument: deleteDocument,
        show: showDocument,
        download: downloadDocument,
        setIdToDelete: setIdToDelete,
        setIdToConsult: setIdToConsult,
        setEntityOnly: setEntityOnly,
    }
)(MainPanelBody);
