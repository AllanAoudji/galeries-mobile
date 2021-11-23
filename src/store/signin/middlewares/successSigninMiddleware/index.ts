import { Middleware } from 'redux';

import { API_SUCCESS } from '#store/api/actionTypes';
import { SIGNIN } from '#store/genericActionTypes';
import { updateSigninStatus } from '#store/signin/actionCreators';
import { setUsersById, updateUserCurrent } from '#store/users/actionCreators';

const successSigninMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== `${SIGNIN} ${API_SUCCESS}`) return;

        if (typeof action.payload.data !== 'object') {
            dispatch(updateSigninStatus('ERROR'));
            return;
        }
        const { user } = action.payload.data;
        if (typeof user !== 'object') {
            dispatch(updateSigninStatus('SUCCESS'));
            return;
        }
        dispatch(setUsersById({ [user.id]: { ...user } }));
        dispatch(updateUserCurrent(user.id));
        dispatch(updateSigninStatus('SUCCESS'));
    };

export default successSigninMiddleware;
