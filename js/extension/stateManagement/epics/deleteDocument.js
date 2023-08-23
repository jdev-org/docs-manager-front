import Rx from "rxjs";
import { DELETE_DOCUMENT, getDocuments, displayMsg, setIdToDelete } from "../actions/actions";
import { getPluginCfg, isActive } from "../selector/selector";

import { deleteDocument } from "@js/extension/requests/documentsApi";

export function deleteDocumentOnClick(action$, store) {
    return action$
        .ofType(DELETE_DOCUMENT)
        .filter(() => isActive(store.getState()))
        .switchMap((action) => {
            let state = store.getState();
            let apiUrl = getPluginCfg(state).api;
            let idPlugin = getPluginCfg(state).id;
            if (!apiUrl || !idPlugin) {
                return Rx.Observable.empty();
            }
            return Rx.Observable.defer(() =>
                deleteDocument(apiUrl, idPlugin, action?.id)
            )
                .catch((e) => {
                    console.log("Error - Get list of documents");
                    console.log(e);
                    // fail message
                    return Rx.Observable.of("error");
                })
                .switchMap((r) => {
                    if (r == "error") {
                        return Rx.Observable.of(
                            displayMsg(
                                "error",
                                "Action impossible",
                                "Veuillez contacter un administrateur."
                            )
                        );
                    }
                    return Rx.Observable.of(
                        displayMsg(
                            "success",
                            "Document",
                            "Suppression réussie !"
                        ),
                        setIdToDelete(null),
                        getDocuments(),
                    );
                });
        });
}
