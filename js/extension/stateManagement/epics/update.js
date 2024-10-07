import Rx from "rxjs";
import {
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
            })).switchMap(r => {
                return Rx.Observable.empty();
            });
        });
