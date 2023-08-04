import Rx from "rxjs";
import { TOGGLE_CONTROL } from "@mapstore/actions/controls";
import { getPluginCfg } from "../selector/selector";
import { CONTROL_NAME } from "@js/extension/constants";
import { SETUP, getDocuments } from "../actions/actions";

export const onSetup = (action$, store) =>
    action$.ofType(SETUP).switchMap(() => {
        const cfg = getPluginCfg(store.getState());
        return Rx.Observable.of(getDocuments(cfg.api, cfg.id));
    });
