import { Dispatch } from 'redux';

import { ERROR_MESSAGE } from '#helpers/constants';
import { dispatchErrorNotification } from '#store/dispatchers';
import { updateMeStatus } from '#store/me/actionCreators';

const successDefaultMethod = (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => {
    const name = action.meta.query ? action.meta.query.name : undefined;
    if (name) dispatch(updateMeStatus('ERROR'));
    dispatchErrorNotification(dispatch, ERROR_MESSAGE.METHOD_NOT_FOUND);
};

export default successDefaultMethod;
