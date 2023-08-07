import Rx from "rxjs";
import { getPluginCfg } from "../selector/selector";
import { SETUP, getDocuments } from "../actions/actions";

export const onSetup = (action$, store) =>
    action$.ofType(SETUP).switchMap(() => {
        return Rx.Observable.of(getDocuments());
    });