import Rx from "rxjs";
import { UPLOAD_DOCUMENT, displayMsg, getDocuments } from "../actions/actions";
import { getPluginCfg, isActive } from "../selector/selector";
import { isEmpty } from "lodash";

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
                    return Rx.Observable.of([]);
                })
                .switchMap((data) => {
                    if (!isEmpty(data)) {
                        return Rx.Observable.of(
                            displayMsg("error", "Document", "Ce libellé est déjà utilisé !")
                        );
                    }
                    return Rx.Observable.defer(() =>
                        uploadDocument(
                            apiUrl,
                            idPlugin,
                            action.file,
                            action.params
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
                                    getDocuments()
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
