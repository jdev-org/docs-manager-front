import React from "react";

import { connect } from "react-redux";
import { isEmpty } from "lodash";
import InformationArea from "../commons/InformationArea";
import {
    deleteDocument,
    downloadDocument,
    getDocuments,
    showDocument,
    uploadDocument,
} from "@js/extension/stateManagement/actions/actions";
import { getDocuments as getPluginDocuments } from "@js/extension/stateManagement/selector/selector";
import { Button, Row } from "react-bootstrap";
import Toolbar from "@mapstore/components/misc/toolbar/Toolbar";
import { Glyphicon } from "react-bootstrap";
import DocumentRow from "../DocumentRow/DocumentRow";
const MainPanelBody = ({
	documents = [],
    refresh = () => {},
    upload = () => {},
    deleteDoc = () => {},
    show = () => {},
    download = () => {},
}) => {

	if (isEmpty(documents)) {
		return <InformationArea
			isVisible
			title="Aucun document"
			message="La liste des documents est vide."
			glyph="eye-close"
		/>
	}
    const toolbarButtons = [
        {
            key: "docs-manager-refresh",
            id: "docs-manager-refresh",
            className: "",
            glyph: "repeat",
            bsStyle: "primary",
            tooltipId: "extension.refresh",
            onClick: () => refresh(),
        },
    ];

    return (
        <>
            <Row>
                <Toolbar
                    id="docs-manager-header-toolbar"
                    buttons={toolbarButtons}
                />
            </Row>
            {documents.map((document) => (<DocumentRow/>))}
            <Button id="docs-manager-upload">
                <Glyphicon glyph="plus" />
            </Button>
        </>
    );
};
export default connect(
    (state) => ({
        documents: getPluginDocuments(state),
    }),
    {
        refresh: getDocuments,
        upload: uploadDocument,
        deleteDoc: deleteDocument,
        show: showDocument,
        download: downloadDocument,
    }
)(MainPanelBody);
