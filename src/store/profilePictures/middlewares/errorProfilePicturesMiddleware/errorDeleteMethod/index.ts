import { Dispatch } from 'redux';

import { dispatchErrorNotification } from '#store/dispatchers';
import { updateProfilePicturesLoadingDelete } from '#store/profilePictures/actionCreators';

const errorDeleteMethod = (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => {
    dispatchErrorNotification(dispatch, action);
    dispatch(updateProfilePicturesLoadingDelete('ERROR'));
};

export default errorDeleteMethod;
