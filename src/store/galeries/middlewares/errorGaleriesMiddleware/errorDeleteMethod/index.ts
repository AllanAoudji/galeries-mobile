import { Dispatch } from 'redux';

import { dispatchErrorNotification } from '#store/dispatchers';
import {
    updateGaleriesFieldsError,
    updateGaleriesLoadingDelete,
} from '#store/galeries/actionCreators';

const errorDeleteMethod = (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => {
    if (
        typeof action.payload === 'object' &&
        (typeof action.payload.name === 'string' ||
            typeof action.payload.password === 'string')
    )
        dispatch(updateGaleriesFieldsError(action.payload));
    else dispatchErrorNotification(dispatch, action);
    dispatch(updateGaleriesLoadingDelete('ERROR'));
};

export default errorDeleteMethod;
