import Rx from "rxjs";
import { UPLOAD_DOCUMENT, displayMsg, getDocuments, setUploadVisibility } from "../actions/actions";
import { getPluginCfg, isActive, getEntity } from "../selector/selector";
import { uniqueId, get } from "lodash";

import {
    uploadDocument,
    verifyLabel,
} from "@js/extension/requests/documentsApi";

export function uploadEvent(action$, store) {
    return action$
        .ofType(UPLOAD_DOCUMENT)
        .filter(() => isActive(store.getState()))
        .switchMap((action) => {
            const apiUrl = getPluginCfg(store.getState()).api;
            const idPlugin = getPluginCfg(store.getState()).id;
            if (!apiUrl || !idPlugin) {
                return Rx.Observable.empty();
            }
            return Rx.Observable.defer(() => {
                if (action.params.label) {
                    return verifyLabel(apiUrl, idPlugin, action.params?.label);
                } else {
                    return [];
                }
            })
                .catch((e) => {
                    console.log("Error - Get list of documents");
                    console.log(e);
                    // fail message
                    return true
                })
                .switchMap(labelExists => {
                    if (labelExists) {
                        return Rx.Observable.of(
                            displayMsg("error", "Document", "Ce libellé est déjà utilisé !")
                        );
                    }
                    const entity = getEntity(store.getState());
                    if (entity) {
                        params = {...action?.params, entity: entity}
                    } else {
                        params = action?.params;
                    }
                    return Rx.Observable.defer(() =>
                        uploadDocument(
                            apiUrl,
                            idPlugin,
                            action.file,
                            params
                        )
                    )
                        .catch((e) => {
                            console.log("Error - Get list of documents");
                            console.log(e);
                            // fail message
                            return Rx.Observable.of([]);
                        })
                        .switchMap((data) => {
                            if (data?.status && data.status == "200") {
                                return Rx.Observable.of(
                                    displayMsg("success", "Document", "Sauvegarde réussie !"),
                                    getDocuments(),
                                    setUploadVisibility(false)
                                );
                            } else {
                                return Rx.Observable.of(
                                    displayMsg("error", "Document", "Echec de la sauvegarde !"),
                                )
                            }
                        });
                });
        });
}
