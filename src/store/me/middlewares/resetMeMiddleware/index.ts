import { Middleware } from 'redux';

import {
    resetMeFieldsError,
    resetMeId,
    resetMeLoadingPut,
    resetMeStatus,
} from '#store/me/actionCreators';
import { ME_RESET } from '#store/me/actionTypes';

const resetMeMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === ME_RESET) {
            dispatch(resetMeId());
            dispatch(resetMeFieldsError());
            dispatch(resetMeLoadingPut());
            dispatch(resetMeStatus());
        }
    };

export default resetMeMiddleware;
