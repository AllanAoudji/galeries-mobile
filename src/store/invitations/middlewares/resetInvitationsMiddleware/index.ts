import { Middleware } from 'redux';

import { INVITATIONS_RESET } from '#store/invitations/actionTypes';
import {
    resetInvitationsAllIds,
    resetInvitationsById,
    resetInvitationsCurrent,
    resetInvitationsEnd,
    resetInvitationsLoadingDelete,
    resetInvitationsLoadingPost,
    resetInvitationsPrevious,
    resetInvitationsStatus,
} from '#store/invitations/actionCreators';

const resetInvitationsMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== INVITATIONS_RESET) return;

        dispatch(resetInvitationsAllIds());
        dispatch(resetInvitationsById());
        dispatch(resetInvitationsCurrent());
        dispatch(resetInvitationsEnd());
        dispatch(resetInvitationsLoadingDelete());
        dispatch(resetInvitationsLoadingPost());
        dispatch(resetInvitationsPrevious());
        dispatch(resetInvitationsStatus());
    };

export default resetInvitationsMiddleware;
