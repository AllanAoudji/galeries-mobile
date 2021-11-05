import { Dispatch } from 'redux';

import { combineInvitationsAllIds } from '#store/combineAllIds';
import {
    setGalerieInvitationsAllIds,
    setInvitationsById,
    updategalerieInvitationsEnd,
    updateGalerieInvitationsPrevious,
    updateGalerieInvitationsStatus,
} from '#store/invitations/actionCreators';
import { getUserId } from '#store/users';

const successGetMethod = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    const galerieId = action.meta.query
        ? action.meta.query.galerieId
        : undefined;
    if (!galerieId) return;
    const galerie = getState().galeries.byId[galerieId];
    if (!galerie) {
        dispatch(updateGalerieInvitationsStatus(galerieId, 'ERROR'));
        return;
    }

    if (typeof action.payload.data !== 'object') {
        dispatch(updateGalerieInvitationsStatus(galerieId, 'ERROR'));
        return;
    }

    const allIds: string[] = [];
    const byId: { [key: string]: Store.Models.Invitation } = {};
    const { invitation, invitations } = action.payload.data;
    if (invitations && Array.isArray(invitations))
        invitations.forEach((i: Store.Models.Invitation) => {
            allIds.push(i.id);
            byId[i.id] = i;
        });
    else if (invitation && typeof invitation === 'object') {
        allIds.push(invitation.id);
        byId[invitation.id] = invitation;
    }

    dispatch(setInvitationsById(byId));

    const previousInvitationId =
        allIds.length > 0 ? allIds[allIds.length - 1] : undefined;
    const previous = previousInvitationId
        ? byId[previousInvitationId].autoIncrementId
        : undefined;

    if (galerieId) {
        if (invitation === undefined) {
            let oldAllIds: string[];
            if (action.meta.refresh) oldAllIds = [];
            else oldAllIds = getState().invitations.allIds[galerieId] || [];
            const newAllIds = combineInvitationsAllIds(
                getState,
                oldAllIds,
                allIds
            );

            dispatch(setGalerieInvitationsAllIds(galerieId, newAllIds));
            dispatch(
                updategalerieInvitationsEnd(galerieId, allIds.length < 20)
            );
            if (previous)
                dispatch(updateGalerieInvitationsPrevious(galerieId, previous));
        }

        dispatch(updateGalerieInvitationsStatus(galerieId, 'SUCCESS'));
    }

    allIds.forEach((id) => {
        const user = getState().users.byId[byId[id].userId];
        if (!user) dispatch(getUserId(byId[id].userId));
    });
};

export default successGetMethod;
