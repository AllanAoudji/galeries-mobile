import { Middleware } from 'redux';

import { dispatchRefreshGalerieInvitations } from '#store/dispatchers';
import { updateGalerieInvitationsStatus } from '#store/invitations/actionCreators';
import { INVITATIONS_REFRESH } from '#store/invitations/actionTypes';

const refreshInvitationsMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== INVITATIONS_REFRESH) return;

        const galerieId = action.meta.query
            ? action.meta.query.galerieId
            : undefined;

        if (galerieId) {
            const status =
                getState().invitations.status[galerieId] || 'PENDING';
            if (status.includes('LOADING')) return;
            if (status === 'REFRESH') return;

            dispatch(updateGalerieInvitationsStatus(galerieId, 'REFRESH'));
            dispatchRefreshGalerieInvitations(dispatch, galerieId);
        }
    };

export default refreshInvitationsMiddleware;
