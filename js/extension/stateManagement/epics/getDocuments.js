import Rx from "rxjs";
import {
    GET_DOCUMENTS,
    setDocuments,
    docsLoading as loading,
} from "../actions/actions";
import { getPluginCfg, isActive } from "../selector/selector";
import { wrapStartStop } from "@mapstore/observables/epics";

import { getDocuments } from "@js/extension/requests/documentsApi";

export function getDocumentsById(action$, store) {
    return action$
        .ofType(GET_DOCUMENTS)
        .filter(() => isActive(store.getState()))
        .switchMap((action) => {
            const apiUrl = getPluginCfg(store.getState()).api;
            const idPlugin = getPluginCfg(store.getState()).id;
            let observable$ = Rx.Observable.empty();
            if (!apiUrl || !idPlugin) {
                return observable$;
            }
            if (apiUrl) {
                observable$ = Rx.Observable.defer(() =>
                    getDocuments(apiUrl, idPlugin, action?.params)
                )
                    .catch((e) => {
                        console.log("Error - Get list of documents");
                        console.log(e);
                        // fail message
                        return Rx.Observable.of([]);
                    })
                    .switchMap((data) => {
                        return Rx.Observable.of(setDocuments(data));
                    });
            } else {
                observable$ = Rx.Observable.of(setDocuments([]));
            }
            return observable$.let(
                wrapStartStop(
                    [loading(true, "documents")],
                    loading(false, "documents"),
                    () => {
                        return Rx.Observable.of(
                            error({
                                title: "Erreur",
                                message:
                                    "La récupération des documents à échouée !",
                            }),
                            loading(false, "documents")
                        );
                    }
                )
            );
        });
}
