import { Middleware } from 'redux';

import { ME_GET } from '#store/me/actionTypes';
import { dispatchGetMe } from '#store/dispatchers';
import { getMeStatus } from '#store/getters';
import { updateMeStatus } from '#store/me/actionCreators';

const getMeMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        const meStatus = getMeStatus(getState);
        if (action.type === ME_GET) {
            if (meStatus !== 'LOADING') {
                dispatch(updateMeStatus('LOADING'));
                dispatchGetMe(dispatch, action);
            }
        }
    };

export default getMeMiddleware;
