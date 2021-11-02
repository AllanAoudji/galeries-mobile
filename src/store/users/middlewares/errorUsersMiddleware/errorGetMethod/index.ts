import { Dispatch } from 'redux';

import { dispatchErrorNotification } from '#store/dispatchers';
import {
    updateGalerieUsersStatus,
    updateUsersStatus,
} from '#store/users/actionCreators';

const errorGetMethod = (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => {
    const galerieId = action.meta.query
        ? action.meta.query.galerieId
        : undefined;
    if (galerieId) dispatch(updateGalerieUsersStatus(galerieId, 'ERROR'));
    else dispatch(updateUsersStatus('ERROR'));
    dispatchErrorNotification(dispatch, action);
};

export default errorGetMethod;
