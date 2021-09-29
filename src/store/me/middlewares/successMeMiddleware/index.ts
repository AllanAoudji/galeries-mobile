import { Dispatch, Middleware } from 'redux';

import { ERROR_MESSAGE } from '#helpers/constants';
import { API_SUCCESS } from '#store/api/actionTypes';
import { dispatchErrorNotification } from '#store/dispatchers';
import { ME } from '#store/genericActionTypes';
import { updateMeId, updateMeStatus } from '#store/me/actionCreators';
import { setUsersById } from '#store/users/actionCreators';

const successDefaultMethod = (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => {
    const name = action.meta.query ? action.meta.query.name : undefined;
    if (name) dispatch(updateMeStatus('ERROR'));
    dispatchErrorNotification(dispatch, ERROR_MESSAGE.METHOD_NOT_FOUND);
};
const successGetMe = (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => {
    const { user } = action.payload.data;
    if (typeof user === 'object' && typeof user.id === 'string') {
        dispatch(updateMeStatus('SUCCESS'));
        dispatch(updateMeId(user.id));
        dispatch(setUsersById({ [user.id]: user }));
    } else {
        dispatch(updateMeStatus('ERROR'));
        dispatchErrorNotification(
            dispatch,
            ERROR_MESSAGE.DEFAULT_ERROR_MESSAGE
        );
    }
};
const successMeMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${ME} ${API_SUCCESS}`) {
            switch (action.meta.method) {
                case 'DELETE':
                    break;
                case 'PUT':
                    break;
                case 'GET':
                    successGetMe(dispatch, action);
                    break;
                default:
                    successDefaultMethod(dispatch, action);
            }
        }
    };

export default successMeMiddleware;
