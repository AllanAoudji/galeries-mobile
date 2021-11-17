import { Dispatch } from 'redux';

import { ERROR_MESSAGE } from '#helpers/constants';
import { dispatchErrorNotification } from '#store/dispatchers';
import { updateMeId, updateMeStatus } from '#store/me/actionCreators';
import { resetNotifications } from '#store/notifications/actionCreators';
import { getMeCurrentProfilePicture } from '#store/profilePictures/actionCreators';
import { setUsersById } from '#store/users/actionCreators';

const successGetMethod = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    const { user } = action.payload.data;
    if (typeof user === 'object' && typeof user.id === 'string') {
        dispatch(updateMeStatus('SUCCESS'));
        dispatch(updateMeId(user.id));
        dispatch(setUsersById({ [user.id]: user }));
        const notificationsStatus = getState().notifications.status;
        if (notificationsStatus !== 'PENDING' && user.hasNewNotifications)
            dispatch(resetNotifications());
        dispatch(getMeCurrentProfilePicture());
    } else {
        dispatch(updateMeStatus('ERROR'));
        dispatchErrorNotification(
            dispatch,
            ERROR_MESSAGE.DEFAULT_ERROR_MESSAGE
        );
    }
};

export default successGetMethod;
