import { Dispatch } from 'redux';

import {
    updateMeFieldsError,
    updateMeLoadingPut,
} from '#store/me/actionCreators';

const errorPutMethod = (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => {
    if (
        typeof action.payload === 'object' &&
        typeof action.payload.pseudonym === 'string'
    )
        dispatch(updateMeFieldsError(action.payload));
    dispatch(updateMeLoadingPut('ERROR'));
};

export default errorPutMethod;
