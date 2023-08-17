import React from "react";
import {connect} from "react-redux";
import { name } from '../../../config';
import { toggleControl } from "@mapstore/actions/controls";
import {createPlugin} from "@mapstore/utils/PluginsUtils";
import MainPanel from "../components/MainPanel/MainPanel";
import { CONTROL_NAME } from "../constants";

import '../assets/style.css';

import { getAuthLevel, getEntity, getFields, getStatus, getUploadVisibility, getRequired, isActive, getApiDocuments } from "../stateManagement/selector/selector";
import reducers from "../stateManagement/reducers/reducers";
import { setup, close, setUploadVisibility, uploadDocument } from "../stateManagement/actions/actions";
import * as epics from "../stateManagement/epics/epicsDistributor";
import init from "./init";
import { Glyphicon } from "react-bootstrap";

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
            documents: getApiDocuments(state)
        }),
        {
            // actions - mapDispatchToProps
            onClose: close,
            setUploadVisibility: setUploadVisibility,
            upload: uploadDocument
        }
    ),
    compose(
        // on setup / close
        connect(() => ({}), {
            setup,
            close,
        }),
        init()
    )
)(MainPanel);



export default createPlugin(name, {
    component: component,
    reducers: { docsManager: reducers },
    epics: {...epics},
    containers: {
        SidebarMenu: {
            name: "docsManager",
            position: 10,
            icon: <Glyphicon glyph="level-up"/>,
            doNotHide: true,
            action: toggleControl.bind(null, CONTROL_NAME, null),
            priority: 1
        }
    }
});
