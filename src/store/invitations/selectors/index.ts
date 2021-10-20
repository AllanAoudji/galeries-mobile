import { createSelector } from 'reselect';

const galeriesCurrentSelector = (state: Store.Reducer) =>
    state.galeries.current;
const invitationsAllIdsSelector = (state: Store.Reducer) =>
    state.invitations.allIds;
const invitationsByIdSelector = (state: Store.Reducer) =>
    state.invitations.byId;
const invitationsCurrentSelector = (state: Store.Reducer) =>
    state.invitations.current;
const invitationsStatusSelector = (state: Store.Reducer) =>
    state.invitations.status;

export const selectCurrentInvitation = createSelector(
    [invitationsByIdSelector, invitationsCurrentSelector],
    (invitationsById, invitationsCurrent) => {
        if (!invitationsCurrent) return undefined;
        return invitationsById[invitationsCurrent];
    }
);
export const selectCurrentGalerieInvitationsAllIds = createSelector(
    [galeriesCurrentSelector, invitationsAllIdsSelector],
    (galeriesCurrent, invitationsAllIds) => {
        if (!galeriesCurrent) return undefined;
        return invitationsAllIds[galeriesCurrent] || [];
    }
);
export const selectCurrentGalerieInvitationsStatus = createSelector(
    [galeriesCurrentSelector, invitationsStatusSelector],
    (galeriesCurrent, invitationsStatus) => {
        if (!galeriesCurrent) return undefined;
        return invitationsStatus[galeriesCurrent] || 'PENDING';
    }
);
export const selectInvitation = (invitationId?: string | null) =>
    createSelector([invitationsByIdSelector], (invitationsById) => {
        if (!invitationId) return undefined;
        return invitationsById[invitationId];
    });
export const selectInvitationsLoadingDelete = (state: Store.Reducer) =>
    state.invitations.loading.delete;
export const selectInvitationsLoadingPost = (state: Store.Reducer) =>
    state.invitations.loading.post;
