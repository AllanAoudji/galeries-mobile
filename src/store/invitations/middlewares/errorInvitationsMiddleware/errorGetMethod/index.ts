import { Dispatch } from 'redux';

import { dispatchErrorNotification } from '#store/dispatchers';
import { getGalerieId } from '#store/galeries/actionCreators';
import { updateGalerieInvitationsStatus } from '#store/invitations/actionCreators';

const errorGetMethod = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    const galerieId = action.meta.query
        ? action.meta.query.galerieId
        : undefined;

    if (galerieId) dispatch(updateGalerieInvitationsStatus(galerieId, 'ERROR'));
    dispatchErrorNotification(dispatch, action);

    if (galerieId) dispatch(getGalerieId(galerieId));
};

export default errorGetMethod;
