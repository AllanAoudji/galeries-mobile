import { Dispatch } from 'redux';

import { dispatchErrorNotification } from '#store/dispatchers';
import {
    updateTicketsFieldsError,
    updateTicketsLoadingPost,
} from '#store/tickets/actionCreators';

const errorPostMethod = (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => {
    if (
        typeof action.payload === 'object' &&
        (typeof action.payload.body === 'string' ||
            typeof action.payload.header === 'string')
    )
        dispatch(updateTicketsFieldsError(action.payload));
    dispatch(updateTicketsLoadingPost('ERROR'));
    dispatchErrorNotification(dispatch, action);
};

export default errorPostMethod;
