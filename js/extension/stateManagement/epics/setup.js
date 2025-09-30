import Rx from "rxjs";
import { SETUP, TOGGLE_DOCS_MANAGER, getDocuments, setEntityOnly } from "../actions/actions";
import { getEntity } from "../selector/selector";
import { toggleControl } from "@mapstore/actions/controls";
import { CONTROL_NAME } from "@js/extension/constants";

export const onSetup = (action$, store) =>
    action$.ofType(SETUP).switchMap(() => {
        const entity = getEntity(store.getState());
        return Rx.Observable.of(
            entity ? setEntityOnly(true) : setEntityOnly(false),
            getDocuments()
        );
    });

export const toggleDocsManager = (action$, store) =>
    action$.ofType(TOGGLE_DOCS_MANAGER).switchMap((action) => {
        return Rx.Observable.of(
            setEntityOnly(action.byEntity),
            toggleControl(CONTROL_NAME, null)
        );
    });