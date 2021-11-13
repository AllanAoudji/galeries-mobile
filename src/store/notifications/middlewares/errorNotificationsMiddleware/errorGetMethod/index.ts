import { Dispatch } from 'redux';

import { dispatchErrorNotification } from '#store/dispatchers';
import { updateNotificationsStatus } from '#store/notifications/actionCreators';

const errorGetMethod = (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => {
    dispatch(updateNotificationsStatus('ERROR'));
    dispatchErrorNotification(dispatch, action);
};

export default errorGetMethod;
