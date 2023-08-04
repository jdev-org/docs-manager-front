import Rx from "rxjs";
import { toggleControl } from "@mapstore/actions/controls";
import { isActive } from "../selector/selector";
import { CONTROL_NAME } from "@js/extension/constants";
import { resetDocsManagerState, CLOSE } from "../actions/actions";

export const closeExtension = (action$, store) =>
    action$
        .ofType(CLOSE)
        .filter(() => isActive(store.getState()))
        .switchMap(() => {
            console.log("close");
            return Rx.Observable.of(
                toggleControl(CONTROL_NAME, "enabled", false),
                resetDocsManagerState()
            );
        });
