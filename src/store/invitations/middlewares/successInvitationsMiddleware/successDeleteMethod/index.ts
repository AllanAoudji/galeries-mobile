import { Dispatch } from 'redux';

import {
    removeGalerieInvitationsAllIds,
    removeInvitationsById,
    resetInvitationsCurrent,
    updateInvitationsLoadingDelete,
} from '#store/invitations/actionCreators';

const successDeleteMethod = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    if (typeof action.payload.data !== 'object') {
        dispatch(updateInvitationsLoadingDelete('ERROR'));
        return;
    }
    const { invitationId } = action.payload.data;
    if (typeof invitationId !== 'string') {
        dispatch(updateInvitationsLoadingDelete('ERROR'));
        return;
    }
    const invitation = getState().invitations.byId[invitationId];
    if (!invitation) {
        dispatch(updateInvitationsLoadingDelete('ERROR'));
        return;
    }

    dispatch(
        removeGalerieInvitationsAllIds(invitation.galerieId, invitationId)
    );
    dispatch(resetInvitationsCurrent());
    dispatch(removeInvitationsById(invitationId));
    dispatch(updateInvitationsLoadingDelete('SUCCESS'));
};

export default successDeleteMethod;
