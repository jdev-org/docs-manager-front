import * as Rx from "rxjs";
import { DISPLAY_MSG } from "../actions/actions";
import { isActive } from "../selector/selector";
import { error, success, warning, info } from "@mapstore/actions/notifications";
import { getMessageById } from "@mapstore/utils/LocaleUtils";

const levels = {
    success: success,
    error: error,
    warning: warning,
    info: info,
};

/**
 * Display a MapStore2 notification
 * The level of the notification. (one of "success"|"warning"|"info"|"error")
 * @param {*} action$
 * @param {*} store
 */
export const showNotification = (action$, store) => {
    return action$
        .ofType(DISPLAY_MSG)
        .filter(() => isActive(store.getState()))
        .switchMap((action) => {
            let messages = store.getState()?.locale.messages;
            return Rx.Observable.of(
                // error message
                levels[action.level]({
                    title: getMessageById(messages, action.title),
                    message: getMessageById(messages, action.message),
                })
            );
        });
};
