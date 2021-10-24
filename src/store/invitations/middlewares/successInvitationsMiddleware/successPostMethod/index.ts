import { Dispatch } from 'redux';
import {
    setGalerieInvitationsAllIds,
    setInvitationsById,
    updateInvitationsLoadingPost,
} from '#store/invitations/actionCreators';
import { combineInvitationsAllIds } from '#store/combineAllIds';

const successPostMethod = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    if (typeof action.payload.data !== 'object') {
        dispatch(updateInvitationsLoadingPost('ERROR'));
        return;
    }
    const { invitation } = action.payload.data;
    if (!invitation || typeof invitation !== 'object') {
        dispatch(updateInvitationsLoadingPost('ERROR'));
        return;
    }
    const galerieId = action.meta.query
        ? action.meta.query.galerieId
        : undefined;
    if (!galerieId) {
        dispatch(updateInvitationsLoadingPost('ERROR'));
        return;
    }

    const invitationsAllIds: string[] = [invitation.id];
    const invitationsById: { [key: string]: Store.Models.Invitation } = {
        [invitation.id]: { ...invitation },
    };

    dispatch(setInvitationsById(invitationsById));

    const oldAllIds = getState().invitations.allIds[galerieId] || [];
    const newAllIds = combineInvitationsAllIds(
        getState,
        oldAllIds,
        invitationsAllIds
    );

    dispatch(setGalerieInvitationsAllIds(galerieId, newAllIds));
    dispatch(updateInvitationsLoadingPost('SUCCESS'));
};

export default successPostMethod;
