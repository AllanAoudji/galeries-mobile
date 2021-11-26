import { Dispatch } from 'redux';

import { dispatchErrorNotification } from '#store/dispatchers';
import {
    updateMeLoadingDelete,
    updateMeFieldsError,
} from '#store/me/actionCreators';

const errorDeleteMethod = (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => {
    if (
        typeof action.payload === 'object' &&
        (typeof action.payload.deleteAccountSentence === 'string' ||
            typeof action.payload.password === 'string' ||
            typeof action.payload.userNameOrEmail)
    ) {
        dispatch(
            updateMeFieldsError({
                ...action.payload,
                deletePassword:
                    typeof action.payload.password === 'string'
                        ? action.payload.password
                        : undefined,
            })
        );
    } else dispatch(updateMeLoadingDelete('ERROR'));
    dispatchErrorNotification(dispatch, action);
};

export default errorDeleteMethod;
