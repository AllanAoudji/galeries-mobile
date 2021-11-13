import { Dispatch } from 'redux';

import { ERROR_MESSAGE } from '#helpers/constants';
import { updateMeId, updateMeStatus } from '#store/me/actionCreators';
import { setUsersById } from '#store/users/actionCreators';
import { dispatchErrorNotification } from '#store/dispatchers';

const successGetMethod = (
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

export default successGetMethod;
