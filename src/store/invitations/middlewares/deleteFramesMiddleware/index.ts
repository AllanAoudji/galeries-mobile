import { Middleware } from 'redux';

import { dispatchDeleteInvitation } from '#store/dispatchers';
import { updateInvitationsLoadingDelete } from '#store/invitations/actionCreators';
import { INVITATIONS_DELETE } from '#store/invitations/actionTypes';

const deleteInvitationMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type !== INVITATIONS_DELETE) return;
        const loading = getState().invitations.loading.delete;
        if (typeof action.payload !== 'string' || loading.includes('LOADING'))
            return;

        dispatch(updateInvitationsLoadingDelete('LOADING'));
        dispatchDeleteInvitation(dispatch, action.payload);
    };

export default deleteInvitationMiddleware;
