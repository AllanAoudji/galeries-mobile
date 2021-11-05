import { Dispatch } from 'redux';

import { ERROR_MESSAGE } from '#helpers/constants';
import { dispatchErrorNotification } from '#store/dispatchers';

const errorDefaultMethod = (dispatch: Dispatch<Store.Action>) =>
    dispatchErrorNotification(dispatch, ERROR_MESSAGE.METHOD_NOT_FOUND);

export default errorDefaultMethod;
