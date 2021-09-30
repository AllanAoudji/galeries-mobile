import { Dispatch } from 'redux';

import { dispatchErrorNotification } from '#store/dispatchers';
import {
    updateFramesFieldsError,
    updateFramesLoadingPost,
} from '#store/frames/actionCreators';

const errorPostMethod = (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => {
    if (
        typeof action.payload === 'object' &&
        typeof action.payload.description === 'string'
    )
        dispatch(updateFramesFieldsError(action.payload));
    else dispatchErrorNotification(dispatch, action);

    dispatch(updateFramesLoadingPost('ERROR'));
};

export default errorPostMethod;
