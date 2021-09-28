import { Middleware } from 'redux';

import { API_ERROR } from '#store/api';
import { dispatchErrorNotification } from '#store/dispatchers';
import { ME } from '#store/genericActionTypes';
import { updateMeStatus } from '#store/me/actionCreators';

const errorMeMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${ME} ${API_ERROR}`) {
            dispatch(updateMeStatus('ERROR'));
            dispatchErrorNotification(dispatch, action);
        }
    };

export default errorMeMiddleware;
