import { Dispatch } from 'redux';

import { dispatchErrorNotification } from '#store/dispatchers';
import { updateReportsLoadingPost } from '#store/reports/actionCreators';

const errorPostMethod = (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => {
    if (
        typeof action.payload === 'object' &&
        typeof action.payload.reason === 'string'
    )
        dispatchErrorNotification(dispatch, action.payload.reason);
    else dispatchErrorNotification(dispatch, action);

    dispatch(updateReportsLoadingPost('ERROR'));
};

export default errorPostMethod;
