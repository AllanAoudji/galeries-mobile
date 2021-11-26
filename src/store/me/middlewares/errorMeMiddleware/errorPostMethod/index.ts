import { Dispatch } from 'redux';

import { dispatchErrorNotification } from '#store/dispatchers';
import {
    updateMeLoadingPut,
    updateMeFieldsError,
} from '#store/me/actionCreators';

const errorPutMethod = (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => {
    if (
        typeof action.payload === 'object' &&
        typeof action.payload.emailPassword === 'string'
    )
        dispatch(updateMeFieldsError(action.payload));
    else dispatchErrorNotification(dispatch, action);
    dispatch(updateMeLoadingPut('ERROR'));
};

export default errorPutMethod;
