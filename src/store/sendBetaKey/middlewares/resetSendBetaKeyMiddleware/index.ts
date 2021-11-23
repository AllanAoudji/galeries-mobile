import { Middleware } from 'redux';

import { resetSendBetaKeyStatusId } from '#store/sendBetaKey/actionCreators';
import { SEND_BETA_KEY_RESET } from '#store/sendBetaKey/actionTypes';

const resetSendBetaKeyMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== SEND_BETA_KEY_RESET) return;

        dispatch(resetSendBetaKeyStatusId());
    };

export default resetSendBetaKeyMiddleware;
