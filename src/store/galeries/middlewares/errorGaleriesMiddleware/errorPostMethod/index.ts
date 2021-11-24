import { Dispatch } from 'redux';

import {
    updateGaleriesFieldsError,
    updateGaleriesLoadingPost,
} from '#store/galeries/actionCreators';

const errorPostMethod = (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => {
    if (
        typeof action.payload === 'object' &&
        (typeof action.payload.description === 'string' ||
            typeof action.payload.name === 'string')
    )
        dispatch(updateGaleriesFieldsError(action.payload));
    dispatch(updateGaleriesLoadingPost('ERROR'));
};

export default errorPostMethod;
