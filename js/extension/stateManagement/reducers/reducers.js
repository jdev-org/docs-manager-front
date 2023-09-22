import { set, compose } from "@mapstore/utils/ImmutableUtils";

import {
    ADD_DOCUMENT,
    RESET_DOCSMANAGER_STATE,
    SETUP,
    SET_DOCUMENTS,
    SET_ID_TO_CONSULT,
    SET_ID_TO_DELETE,
    SET_UPLOAD_VISIBILITY,
    VALID_VALUES,
    SET_ENTITY_ONLY,
} from "../actions/actions";

const initialState = {
    pluginCfg: {},
    visible: false,
    activate: false,
    documents: [],
    document: null,
    uploadVisibility: false,
    idToDelete: null,
    idToConsult: null,
    uploadIsValid: false,
    entityOnly: null,
};

export default function reducers(state = initialState, action) {
    switch (action.type) {
        case SET_ENTITY_ONLY:
            return set("entityOnly", action.checked, state);
        case SET_ID_TO_CONSULT:
            return compose(
                set("idToConsult", action.id),
                set("idToDelete", null)
            )(state);
        case SET_ID_TO_DELETE:
            return compose(
                set("idToConsult", null),
                set("idToDelete", action.id)
            )(state);
        case VALID_VALUES:
            return set("uploadIsValid", action.values, state);
        case SET_UPLOAD_VISIBILITY:
            return set("uploadVisibility", action.visible, state);
        case ADD_DOCUMENT:
            return set("document", action.document, state);
        case SET_DOCUMENTS:
            return set("documents", action.documents, state);
        case SETUP:
            return set("pluginCfg", action.cfg, state);
        case RESET_DOCSMANAGER_STATE:
            return compose(
                set("documents", []),
                set("document", null),
                set("uploadVisibility", false),
                set("idToDelete", null),
                set("idToConsult", null)
            )(state);
        default:
            return state;
    }
}
