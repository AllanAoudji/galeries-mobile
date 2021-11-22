import { Middleware } from 'redux';

import { API_SUCCESS } from '#store/api/actionTypes';
import { SIGNIN } from '#store/genericActionTypes';
import { updateSigninStatus } from '#store/signin/actionCreators';

const successSigninMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== `${SIGNIN} ${API_SUCCESS}`) return;

        dispatch(updateSigninStatus('SUCCESS'));
    };

export default successSigninMiddleware;
