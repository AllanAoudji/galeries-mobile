import { Middleware } from 'redux';

import {
    dispatchGetGalerieInvitations,
    dispatchGetInvitation,
} from '#store/dispatchers';
import { updateGalerieInvitationsStatus } from '#store/invitations/actionCreators';
import { INVITATIONS_GET } from '#store/invitations/actionTypes';

const getInvitationsMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== INVITATIONS_GET) return;

        const galerieId = action.meta.query
            ? action.meta.query.galerieId
            : undefined;

        if (typeof action.payload === 'string')
            dispatchGetInvitation(dispatch, action.payload);
        else if (galerieId) {
            const end = getState().invitations.end[galerieId] || false;
            const status =
                getState().invitations.status[galerieId] || 'PENDING';
            if (end || status.includes('LOADING')) return;

            const newStatus: Store.Status =
                status === 'PENDING' ? 'INITIAL_LOADING' : 'LOADING';
            const previous = getState().invitations.previous[galerieId];

            dispatch(updateGalerieInvitationsStatus(galerieId, newStatus));
            dispatchGetGalerieInvitations(dispatch, galerieId, previous);
        }
    };

export default getInvitationsMiddleware;
