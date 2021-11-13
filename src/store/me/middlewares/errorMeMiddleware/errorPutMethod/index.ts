import { Dispatch } from 'redux';

import { dispatchErrorNotification } from '#store/dispatchers';

const errorPutMethod = (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => {
    dispatchErrorNotification(dispatch, action.payload);
};

export default errorPutMethod;
