import Rx from "rxjs";
import {
    GET_DOCUMENTS,
    setDocuments,
    getDocuments as callDocuments,
    docsLoading as loading,
    SET_ENTITY_ONLY,
} from "../actions/actions";
import {
    getDocEntityOnly,
    getEntity,
    getPluginCfg,
    isActive,
    isAdmin,
} from "../selector/selector";
import { wrapStartStop } from "@mapstore/observables/epics";

import { getDocuments } from "@js/extension/requests/documentsApi";

export function setShowAllDocs(action$, store) {
    return action$
        .ofType(SET_ENTITY_ONLY)
        .filter(() => isActive(store.getState()))
        .switchMap((action) => {
            return Rx.Observable.of(callDocuments());
        });
}

export function getDocumentsById(action$, store) {
    return action$
        .ofType(GET_DOCUMENTS)
        .filter(() => isActive(store.getState()))
        .switchMap((action) => {
            const entity = getEntity(store.getState());
            const isAdminUser = isAdmin(store.getState());
            const apiUrl = getPluginCfg(store.getState()).api;
            const idPlugin = getPluginCfg(store.getState()).id;
            let params = action?.params;
            let observable$ = Rx.Observable.empty();
            if (!apiUrl || !idPlugin) {
                return observable$;
            }
            if (!isAdminUser && !entity) {
                return Rx.Observable.empty();
            }

            if (!isAdminUser && entity) {
                params = { ...params, entity: entity };
            } else if (
                isAdminUser &&
                getDocEntityOnly(store.getState()) &&
                entity
            ) {
                params = { ...params, entity: entity };
            }
            if (apiUrl) {
                observable$ = Rx.Observable.defer(() =>
                    getDocuments(apiUrl, idPlugin, params)
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
