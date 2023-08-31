import React from "react";
import { connect } from "react-redux";
import { name } from "../../../config";
import { toggleControl } from "@mapstore/actions/controls";
import { createPlugin } from "@mapstore/utils/PluginsUtils";
import MainPanel from "../components/MainPanel/MainPanel";
import { CONTROL_NAME } from "../constants";

import tooltip from "@mapstore/components/misc/enhancers/tooltip";


import "../assets/style.css";

import {
    getAuthLevel,
    getEntity,
    getFields,
    getStatus,
    getUploadVisibility,
    getRequired,
    isActive,
    getApiDocuments,
    getIdToDelete,
    getUploadValidation,
    getIdToConsult,
} from "../stateManagement/selector/selector";
import reducers from "../stateManagement/reducers/reducers";
import {
    setup,
    close,
    setUploadVisibility,
    uploadDocument,
    controlValues,
    setIdToConsult,
} from "../stateManagement/actions/actions";
import * as epics from "../stateManagement/epics/epicsDistributor";
import init from "./init";
import { Glyphicon, Button } from "react-bootstrap";

const TooltipButton = tooltip(Button);

const compose = (...functions) => {
    return (args) => functions.reduceRight((arg, fn) => fn(arg), args);
};

const component = compose(
    connect(
        // selectors - mapStateToProps
        (state) => ({
            // selectors
            active: isActive(state),
            authorized: getAuthLevel(state),
            isUpload: getUploadVisibility(state),
            entity: getEntity(state),
            statusValues: getStatus(state),
            required: getRequired(state),
            fields: getFields(state),
            documents: getApiDocuments(state),
            idToDelete: getIdToDelete(state),
            idToConsult: getIdToConsult(state),
            uploadValidation: getUploadValidation(state),
        }),
        {
            // actions - mapDispatchToProps
            onClose: toggleControl.bind(null, CONTROL_NAME, null),
            setUploadVisibility: setUploadVisibility,
            upload: uploadDocument,
            controlUpload: controlValues,
            setIdToConsult: setIdToConsult,
        }
    ),
    compose(
        // on setup / close
        connect(() => ({}), {
            setup,
        }),
        init()
    )
)(MainPanel);

export default createPlugin(name, {
    component: component,
    reducers: { docsManager: reducers },
    epics: { ...epics },
    containers: {
        SidebarMenu: {
            name: "docsManager",
            position: 10,
            icon: <Glyphicon glyph="level-up" />,
            doNotHide: true,
            action: toggleControl.bind(null, CONTROL_NAME, null),
            priority: 1,
        },
        BurgerMenu: {
            name: "docsManager",
            position: 10,
            icon: <Glyphicon glyph="level-up" />,
            doNotHide: true,
            action: toggleControl.bind(null, CONTROL_NAME, null),
            priority: 3,
        },
        d2t: {
            name: "docsManagerBtnToolbar",
            action: toggleControl.bind(null, CONTROL_NAME, null),
            position: 10,
            doNotHide: true,
            priority: 1,
            target: "toolbar",
            icon: <Glyphicon glyph="level-up" />,
            Component: connect(() => ({}), {
                click: toggleControl.bind(null, CONTROL_NAME, null),
            })((props) => {
                return (
                    <TooltipButton onClick={props?.click} tooltip={"Documents"}>
                        <Glyphicon
                            glyph={props?.pluginsCfg?.icon || "level-up"}
                        />
                    </TooltipButton>
                );
            }),
        },
    },
});
