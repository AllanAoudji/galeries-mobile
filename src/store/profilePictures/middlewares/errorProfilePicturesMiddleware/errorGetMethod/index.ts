import { Dispatch } from 'redux';

import { dispatchErrorNotification } from '#store/dispatchers';
import { updateProfilePicturesStatus } from '#store/profilePictures';

const errorGetMethod = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    const userId = action.payload.query
        ? action.payload.query.userId
        : undefined;

    dispatch(updateProfilePicturesStatus(userId || '', 'ERROR'));
    dispatchErrorNotification(dispatch, action);
};

export default errorGetMethod;
