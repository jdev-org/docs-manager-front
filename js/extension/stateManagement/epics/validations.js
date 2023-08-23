import Rx from "rxjs";
import { isActive, getPluginCfg } from "../selector/selector";
import { CONTROL_VALUES, validValues } from "../actions/actions";
import { verifyLabel } from "@js/extension/requests/documentsApi";

export const controlUploadValues = (action$, store) =>
    action$
        .ofType(CONTROL_VALUES)
        .filter(() => isActive(store.getState()))
        .switchMap((action) => {
            const apiUrl = getPluginCfg(store.getState()).api;
            const idPlugin = getPluginCfg(store.getState()).id;
            if (!apiUrl || !idPlugin || !action.values?.label) {
                return Rx.Observable.empty();
            }
            return Rx.Observable.defer(() => {
                if (action?.values?.label) {
                    return verifyLabel(apiUrl, idPlugin, action.values?.label);
                } else {
                    return false;
                }
            })
                .catch((e) => {
                    console.log("Error - Get list of documents");
                    console.log(e);
                    // fail message
                    return false;
                })
                .switchMap((labelExists) => {
                    return Rx.Observable.of(validValues({label:!labelExists}));
                });
        });
