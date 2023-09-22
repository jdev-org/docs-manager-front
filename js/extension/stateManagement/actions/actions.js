export const SETUP = "SETUP";
export const CLOSE = "CLOSE";
export const SET_CONFIG = "SET_CONFIG";
export const DOWNLOAD_DOCUMENT = "DOWNLOAD_DOCUMENT";
export const UPLOAD_DOCUMENT = "UPLOAD_DOCUMENT";
export const ADD_DOCUMENT = "ADD_DOCUMENT";
export const GET_DOCUMENT = "GET_DOCUMENT";
export const DELETE_DOCUMENT = "DELETE_DOCUMENT";
export const GET_DOCUMENTS = "GET_DOCUMENTS";
export const SHOW_NOTIFICATIONS = "SHOW_NOTIFICATIONS";
export const DISPLAY_MSG = "DISPLAY_MSG";
export const RESET_DOCSMANAGER_STATE = "RESET_DOCSMANAGER_STATE";
export const SHOW_DOCUMENT = "SHOW_DOCUMENT";
export const SET_DOCUMENTS = "SET_DOCUMENTS";
export const DOCS_LOADING = "DOCS_LOADING";
export const SET_UPLOAD_VISIBILITY = "SET_UPLOAD_VISIBILITY";
export const SET_ID_TO_DELETE = "SET_ID_TO_DELETE";
export const SET_ID_TO_CONSULT = "SET_ID_TO_CONSULT";
export const VALID_VALUES = "VALID_VALUES";
export const CONTROL_VALUES = "CONTROL_VALUES";
export const SET_ENTITY_ONLY = "SET_ENTITY_ONLY";

export const controlValues = (values) => ({
    type: CONTROL_VALUES,
    values,
});

export const validValues = (values) => ({
    type: VALID_VALUES,
    values,
});

export const setIdToConsult = (id) => ({
    type: SET_ID_TO_CONSULT,
    id,
});

export const setIdToDelete = (id) => ({
    type: SET_ID_TO_DELETE,
    id,
});

export const setUploadVisibility = (visible) => ({
    type: SET_UPLOAD_VISIBILITY,
    visible,
});
export const docsLoading = (value, name, mode) => ({
    type: DOCS_LOADING,
    value,
    name,
    mode,
});

/**
 *
 * @param {string} level
 * @param {string} title
 * @param {string} message
 * @returns
 */
export const displayMsg = (level, title, message) => ({
    type: DISPLAY_MSG,
    level,
    title,
    message,
});

/**
 * setup
 * @returns {}
 */
export const setDocuments = (documents) => ({
    type: SET_DOCUMENTS,
    documents,
});

/**
 * setup
 * @returns {}
 */
export const setup = (cfg) => ({
    type: SETUP,
    cfg,
});

export const close = (cfg) => ({
    type: CLOSE,
    cfg,
});

/**
 * reset State
 * @returns {}
 */
export const resetDocsManagerState = () => ({
    type: RESET_DOCSMANAGER_STATE,
});

/**
 * Upload a document
 * @param {object} document
 * @returns {{document: object}}
 */
export const uploadDocument = (file, params) => ({
    type: UPLOAD_DOCUMENT,
    file,
    params,
});

/**
 * Download a document
 * @param {string} id
 * @returns {{id: string}}
 */
export const downloadDocument = (id) => ({
    type: DOWNLOAD_DOCUMENT,
    id,
});

/**
 * Show a document in other browser tab
 * @param {string} id
 * @returns {{id:string}}
 */
export const showDocument = (id) => ({
    type: SHOW_DOCUMENT,
    id,
});

/**
 * Get list of documents
 * @param {string} id
 * @returns {{id:string}}
 */
export const getDocument = (id, params = {}) => ({
    type: GET_DOCUMENT,
    id,
    params,
});

export const setEntityOnly = (checked) => ({
    type: SET_ENTITY_ONLY,
    checked,
});

/**
 * Get list of documents
 * @param {string} id
 * @returns {{id:string}}
 */
export const getDocuments = (params = {}, entity = false) => ({
    type: GET_DOCUMENTS,
    params,
    entity,
});

/**
 * Delete a document by id
 * @param {string} id
 * @returns {{id: string}}
 */
export const deleteDocument = (id) => ({
    type: DELETE_DOCUMENT,
    id,
});
