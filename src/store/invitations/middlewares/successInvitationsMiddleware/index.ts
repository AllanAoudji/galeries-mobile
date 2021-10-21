import { Middleware } from 'redux';

import { API_SUCCESS } from '#store/api';
import { INVITATIONS } from '#store/genericActionTypes';

import successDefaultMethod from './successDefaultMethod';
import successDeleteMethod from './successDeleteMethod';
import successGetMethod from './successGetMethod';
import successPostMethod from './successPostMethod';

const successInvitationsMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== `${INVITATIONS} ${API_SUCCESS}`) return;

        switch (action.meta.method) {
            case 'DELETE':
                successDeleteMethod(dispatch, getState, action);
                break;
            case 'GET':
                successGetMethod(dispatch, getState, action);
                break;
            case 'POST':
                successPostMethod(dispatch, getState, action);
                break;
            default:
                successDefaultMethod(dispatch);
        }
    };

export default successInvitationsMiddleware;
