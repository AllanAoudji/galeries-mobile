import { Dispatch } from 'redux';

import { dispatchErrorNotification } from '#store/dispatchers';
import { updateProfilePicturesLoadingPost } from '#store/profilePictures/actionCreators';

const errorPostMethod = (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => {
    dispatchErrorNotification(dispatch, action);
    dispatch(updateProfilePicturesLoadingPost('ERROR'));
};

export default errorPostMethod;
