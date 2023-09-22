import Rx from "rxjs";
import {
    DOWNLOAD_DOCUMENT,
    displayMsg,
    SHOW_DOCUMENT,
} from "../actions/actions";
import { getPluginCfg, isActive } from "../selector/selector";

import { clickUrl, showDocInTab } from "@js/extension/utils/utils";
import { showDocument } from "@js/extension/requests/documentsApi";
export function downloadOnClick(action$, store) {
    return action$
        .ofType(DOWNLOAD_DOCUMENT)
        .filter(() => isActive(store.getState()))
        .switchMap((action) => {
            let state = store.getState();
            let apiUrl = getPluginCfg(state).api;
            let idPlugin = getPluginCfg(state).id;
            if (!apiUrl || !idPlugin) {
                return Rx.Observable.of(
                    displayMsg(
                        "error",
                        "Téléchargement",
                        "Configuration incomplète : Veuillez contacter un administrateur."
                    )
                );
            }
            const docUrl = `${apiUrl}/plugin/${idPlugin}/${action.id}`;
            clickUrl(docUrl);
            return Rx.Observable.of(
                displayMsg("success", "Téléchargement", "Document téléchargé!")
            );
        });
}

export function showOnClick(action$, store) {
    return action$
        .ofType(SHOW_DOCUMENT)
        .filter(() => isActive(store.getState()))
        .switchMap((action) => {
            let state = store.getState();
            let apiUrl = getPluginCfg(state).api;
            let idPlugin = getPluginCfg(state).id;
            if (!apiUrl || !idPlugin) {
                return Rx.Observable.of(
                    displayMsg(
                        "error",
                        "Téléchargement",
                        "Configuration incomplète : Veuillez contacter un administrateur."
                    )
                );
            }
            const docUrl = `${apiUrl}/plugin/${idPlugin}/${action.id}`;
            return Rx.Observable.defer(() => showDocument(docUrl))
                .catch((e) => {
                    console.log("Error - Get list of documents");
                    console.log(e);
                    // fail message
                    return Rx.Observable.of([]);
                })
                .switchMap((data) => {
                    return Rx.Observable.of(
                        showDocInTab(data),
                        displayMsg(
                            "success",
                            "Téléchargement",
                            "Document réceptionné!"
                        )
                    );
                });
        });
}
