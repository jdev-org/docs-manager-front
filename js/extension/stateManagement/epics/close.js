import Rx from "rxjs";
import { TOGGLE_CONTROL, toggleControl } from "@mapstore/actions/controls";
import { isActive } from "../selector/selector";
import { CONTROL_NAME } from "@js/extension/constants";
import { resetDocsManagerState, CLOSE } from "../actions/actions";

export const closeExtension = (action$, store) =>
    action$
        .ofType(TOGGLE_CONTROL)
        .filter(
            (action) =>
                isActive(store.getState()) && action.control == CONTROL_NAME
        )
        .switchMap(() => {
            return Rx.Observable.of(resetDocsManagerState());
        });
