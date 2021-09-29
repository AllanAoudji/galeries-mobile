import { Dispatch } from 'redux';

import { ERROR_MESSAGE } from '#helpers/constants';
import { updateNotification } from '#store/notification/actionCreators';

const dispatchErrorNotification: (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action | string
) => void = (dispatch, action) => {
    if (action === 'string')
        dispatch(
            updateNotification({
                status: 'error',
                text: action,
            })
        );
    else if (
        typeof action === 'object' &&
        typeof action.payload === 'string' &&
        action.payload.trim() !== ''
    )
        dispatch(
            updateNotification({
                status: 'error',
                text: action.payload.trim(),
            })
        );
    else
        dispatch(
            updateNotification({
                status: 'error',
                text: ERROR_MESSAGE.DEFAULT_ERROR_MESSAGE,
            })
        );
};

export default dispatchErrorNotification;
