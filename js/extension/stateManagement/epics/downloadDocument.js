import Rx from "rxjs";
import { DOWNLOAD_DOCUMENT, displayMsg } from "../actions/actions";
import { getPluginCfg, isActive } from "../selector/selector";

import { clickUrl } from "@js/extension/utils/utils";
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
            return Rx.Observable.of(
                clickUrl(docUrl),
                displayMsg("success", "Téléchargement", "Document téléchargé!")
            );
        });
}
