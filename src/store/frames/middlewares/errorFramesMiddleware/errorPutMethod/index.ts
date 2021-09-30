import { Dispatch } from 'redux';

import { dispatchErrorNotification } from '#store/dispatchers';
import {
    updateFramesFieldsError,
    updateFramesLoadingPut,
} from '#store/frames/actionCreators';

const errorPutMethod = (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => {
    if (
        typeof action.payload === 'object' &&
        typeof action.payload.description === 'string'
    )
        dispatch(updateFramesFieldsError(action.payload));
    else dispatchErrorNotification(dispatch, action.payload);

    dispatch(updateFramesLoadingPut('ERROR'));
};

export default errorPutMethod;
