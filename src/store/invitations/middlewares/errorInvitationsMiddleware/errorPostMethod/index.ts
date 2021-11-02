import { Dispatch } from 'redux';

import { dispatchErrorNotification } from '#store/dispatchers';
import { getGalerieId } from '#store/galeries/actionCreators';
import { updateInvitationsLoadingPost } from '#store/invitations/actionCreators';

const errorPostMethod = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    dispatch(updateInvitationsLoadingPost('ERROR'));
    dispatchErrorNotification(dispatch, action);

    const galerieId = action.meta.query
        ? action.meta.query.galeriId
        : undefined;
    if (!galerieId) return;
    const galerie = getState().galeries.byId[galerieId];
    if (!galerie) return;
    dispatch(getGalerieId(galerieId));
};

export default errorPostMethod;
