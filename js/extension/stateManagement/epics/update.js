import Rx from "rxjs";
import {
    displayMsg,
    getDocuments,
    UPDATE_DOCUMENT
} from "../actions/actions";
import { getPluginCfg } from "../selector/selector";

import {
    updateDocument as updateRequest
} from "@js/extension/requests/documentsApi";

export const updateDocument = (action$, store) =>
    action$
        .ofType(UPDATE_DOCUMENT)
        .switchMap(({params}) => {
            const apiUrl = getPluginCfg(store.getState()).api;
            const idPlugin = getPluginCfg(store.getState()).id;
            return Rx.Observable.defer(() => updateRequest(apiUrl, params?.id, idPlugin, {
                opened: params?.opened || false,
                comment: params?.comment,
                entity: params?.entity,
                id: params?.id,
                label: params?.label,
                ...(params?.dateDoc ? {dateDoc: params?.dateDoc} : {})
            })).catch((e) => {
                console.log("Error - On document update");
                console.log(e);
                // fail message
                return Rx.Observable.of([]);
            }).switchMap(data => {
                if (data?.status && data.status == "200") {
                    return Rx.Observable.of(
                        displayMsg(
                            "success",
                            "Document",
                            "Modification réussie !"
                        ),
                        getDocuments()
                    );
                } else {
                    return Rx.Observable.of(
                        displayMsg(
                            "error",
                            "Document",
                            "Echec de la modification !"
                        )
                    );
                }
            });
        });
