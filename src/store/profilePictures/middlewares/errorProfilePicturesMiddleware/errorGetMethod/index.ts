import { Dispatch } from 'redux';

import { getUser } from '#store/getters';
import {
    dispatchErrorNotification,
    dispatchUserCurrentProfilePicture,
} from '#store/dispatchers';

const errorGetMethod = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    const userId = action.payload.query
        ? action.payload.query.userId
        : undefined;
    if (typeof userId !== 'string') return;
    const user = getUser(getState, userId);
    if (!user) return;

    dispatchUserCurrentProfilePicture(dispatch, user, {
        status: 'ERROR',
    });
    dispatchErrorNotification(dispatch, action);
};

export default errorGetMethod;
