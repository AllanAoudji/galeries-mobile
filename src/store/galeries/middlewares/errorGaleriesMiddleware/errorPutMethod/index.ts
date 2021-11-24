import { Dispatch } from 'redux';

import {
    updateGaleriesFieldsError,
    updateGaleriesLoadingPut,
} from '#store/galeries/actionCreators';

const errorPutMethod = (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => {
    if (
        typeof action.payload === 'object' &&
        (typeof action.payload.description === 'string' ||
            typeof action.payload.name === 'string')
    )
        dispatch(updateGaleriesFieldsError(action.payload));
    dispatch(updateGaleriesLoadingPut('ERROR'));
};

export default errorPutMethod;
