import { set, compose } from "@mapstore/utils/ImmutableUtils";

import {
    ADD_DOCUMENT,
    RESET_DOCSMANAGER_STATE,
    SETUP,
    SET_DOCUMENTS,
    SET_UPLOAD_VISIBILITY,
} from "../actions/actions";

const initialState = {
    pluginCfg: {},
    visible: false,
    activate: false,
    documents: [],
    document: null,
    uploadVisibility: false
};

export default function reducers(state = initialState, action) {
    switch (action.type) {
        case SET_UPLOAD_VISIBILITY:
            return set("uploadVisibility", action.visible, state);
        case ADD_DOCUMENT:
            return set("document", action.document, state);
        case SET_DOCUMENTS:
            return set("documents", action.documents, state);
        case SETUP:
            return set("pluginCfg", action.cfg, state);
        case RESET_DOCSMANAGER_STATE:
            return compose(set("documents", []), set("document", null), set("uploadVisibility", false))(state);
        default:
            return state;
    }
}
