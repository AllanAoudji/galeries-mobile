import { Middleware } from 'redux';

import { INVITATIONS_POST } from '#store/invitations/actionTypes';
import { updateInvitationsLoadingPost } from '#store/invitations/actionCreators';
import { dispatchPostInvitations } from '#store/dispatchers';

const postInvitationsMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== INVITATIONS_POST) return;

        const galerieId = action.meta.query
            ? action.meta.query.galerieId
            : undefined;
        const loading = getState().invitations.loading.post;

        if (!galerieId) return;
        if (loading.includes('LOADING')) return;
        if (typeof action.payload !== 'object') return;
        if (
            action.payload.numOfInvits !== undefined ||
            typeof action.payload.numOfInvits !== 'number'
        )
            return;
        if (
            action.payload.time !== undefined ||
            typeof action.payload.time !== 'number'
        )
            return;

        dispatch(updateInvitationsLoadingPost('LOADING'));
        dispatchPostInvitations(dispatch, galerieId, action.payload);
    };

export default postInvitationsMiddleware;
