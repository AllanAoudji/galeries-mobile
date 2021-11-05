import { Middleware } from 'redux';

import { API_ERROR } from '#store/api';
import { INVITATIONS } from '#store/genericActionTypes';

import errorDefaultMethod from './errorDefaultMethod';
import errorDeleteMethod from './errorDeleteMethod';
import errorGetMethod from './errorGetMethod';
import errorPostMethod from './errorPostMethod';

const errorInvitationsMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== `${INVITATIONS} ${API_ERROR}`) return;

        switch (action.meta.method) {
            case 'DELETE':
                errorDeleteMethod(dispatch, getState, action);
                break;
            case 'GET':
                errorGetMethod(dispatch, getState, action);
                break;
            case 'POST':
                errorPostMethod(dispatch, getState, action);
                break;
            default:
                errorDefaultMethod(dispatch);
        }
    };

export default errorInvitationsMiddleware;
