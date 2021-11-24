import { Dispatch } from 'redux';

import { getGalerieId } from '#store/galeries/actionCreators';
import {
    removeGalerieInvitationsAllIds,
    removeInvitationsById,
    updateGalerieInvitationsStatus,
} from '#store/invitations/actionCreators';

const errorGetMethod = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    const galerieId = action.meta.query
        ? action.meta.query.galerieId
        : undefined;
    const invitationId = action.meta.query
        ? action.meta.query.invitationId
        : undefined;

    if (galerieId) dispatch(updateGalerieInvitationsStatus(galerieId, 'ERROR'));
    else if (invitationId) {
        const invitation = getState().invitations.byId[invitationId];
        if (invitation) {
            dispatch(removeInvitationsById(invitationId));
            dispatch(
                removeGalerieInvitationsAllIds(
                    invitation.galerieId,
                    invitationId
                )
            );
        }
    }

    if (galerieId) dispatch(getGalerieId(galerieId));
};

export default errorGetMethod;
