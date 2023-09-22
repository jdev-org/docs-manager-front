import Rx from "rxjs";
import { SETUP, getDocuments, setEntityOnly } from "../actions/actions";
import { getEntity } from "../selector/selector";

export const onSetup = (action$, store) =>
    action$.ofType(SETUP).switchMap(() => {
        const entity = getEntity(store.getState());
        return Rx.Observable.of(
            entity ? setEntityOnly(true) : setEntityOnly(false),
            getDocuments()
        );
    });
