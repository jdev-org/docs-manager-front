import { userGroupSecuritySelector } from "@mapstore/selectors/security";
import { CONTROL_NAME } from "@js/extension/constants";
import { get, isEmpty } from "lodash";

export const isActive = (state) => {
    return (
        (state.controls &&
            state.controls[CONTROL_NAME] &&
            state.controls[CONTROL_NAME].enabled) ||
        (state[CONTROL_NAME] && state[CONTROL_NAME].closing) ||
        false
    );
};
/**
 * Get plugin config
 * @param {*} state
 * @returns {object}
 */
export const getPluginCfg = (state) => state?.docsManager?.pluginCfg;
export const getApiDocuments = (state) => state?.docsManager?.documents;
export const getIdToDelete = state => state?.docsManager?.idToDelete;
export const getIdToConsult = state => state?.docsManager?.idToConsult;

export const getEntity = (state) => {
    let cfg = state?.pluginCfg;
    if (cfg?.entity?.get) {
        return get(state, cfg.entity.get);
    }
    if (cfg?.entity && cfg?.entity?.plugin && cfg?.entity?.plugin.propCfg) {
        let pluginCfg = state[plugin]?.pluginCfg;
        return pluginCfg ? pluginCfg[propCfg] : null;
    }
}

export const getUploadValidation = (state) => state?.docsManager?.uploadIsValid;
export const getApi = (state) => state?.docsManager?.api;
export const getId = (state) => state?.docsManager?.id;
export const getStatus = (state) => state?.docsManager?.pluginCfg?.statusValues;
export const getFields = (state) => state?.docsManager?.pluginCfg?.fields;
export const getRequired = (state) => state?.docsManager?.pluginCfg?.requiredFields;
export const getUploadVisibility = (state) =>
    state?.docsManager.uploadVisibility;

// to emulate authentication use test_env and sec-roles header as : "ROLE_MAPSTORE_ADMIN;ROLE_EL_APPLIS_CAD_CNIL1" (; separator)
export const getAuthLevel = (state) => {
    const groups = userGroupSecuritySelector(state) ?? [];
    const groupNames = groups.map(({ groupName }) => groupName);
    let allowedRoles = getPluginCfg(state)?.allowedRoles;
    if (isEmpty(allowedRoles)) {
        allowedRoles = ["MAPSTORE_ADMIN"];
    }
    const fullyAuthorized = !isEmpty(
        allowedRoles
            .map((role) => groupNames.includes(role))
            .filter((role) => role)
    );
    return fullyAuthorized;
};
