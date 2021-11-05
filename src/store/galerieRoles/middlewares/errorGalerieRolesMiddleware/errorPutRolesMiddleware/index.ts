import { Dispatch } from 'redux';

import { dispatchErrorNotification } from '#store/dispatchers';
import { updateGalerieRolesLoadingPut } from '#store/galerieRoles/actionCreators';

const errorPutMethod = (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => {
    dispatchErrorNotification(dispatch, action.payload);
    dispatch(updateGalerieRolesLoadingPut('ERROR'));
};

export default errorPutMethod;
