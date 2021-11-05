import { Dispatch } from 'redux';

import { dispatchErrorNotification } from '#store/dispatchers';
import { getGalerieId } from '#store/galeries/actionCreators';
import { updateInvitationsLoadingDelete } from '#store/invitations/actionCreators';

const errorDeleteMethod = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    dispatch(updateInvitationsLoadingDelete('ERROR'));
    dispatchErrorNotification(dispatch, action);

    const invitationId = action.meta.query
        ? action.meta.query.invitationId
        : undefined;
    if (!invitationId) return;
    const invitation = getState().invitations.byId[invitationId];
    if (!invitation) return;
    dispatch(getGalerieId(invitation.galerieId));
};

export default errorDeleteMethod;
