import { Dispatch } from 'redux';

import {
    updateBetaKeysLoadingPost,
    updateBetaKeysFieldsError,
} from '#store/betaKeys/actionCreators';
import { dispatchErrorNotification } from '#store/dispatchers';

const errorPostMethod = (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => {
    if (
        typeof action.payload === 'object' &&
        typeof action.payload.email === 'string'
    )
        dispatch(updateBetaKeysFieldsError(action.payload));
    else dispatchErrorNotification(dispatch, action);
    dispatch(updateBetaKeysLoadingPost('ERROR'));
};

export default errorPostMethod;
