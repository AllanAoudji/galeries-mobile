import { Middleware } from 'redux';

import { dispatchGetMe } from '#store/dispatchers';
import { updateMeStatus } from '#store/me/actionCreators';
import { ME_GET } from '#store/me/actionTypes';

const getMeMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== ME_GET) return;
        const meStatus = getState().me.status;
        if (meStatus.includes('LOADING')) return;

        dispatch(updateMeStatus('LOADING'));
        dispatchGetMe(dispatch, action);
    };

export default getMeMiddleware;
