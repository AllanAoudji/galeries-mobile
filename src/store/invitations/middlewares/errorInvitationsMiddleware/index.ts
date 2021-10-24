import { Middleware } from 'redux';

import { API_ERROR } from '#store/api';
import { INVITATIONS } from '#store/genericActionTypes';

import errorDefaultMethod from './errorDefaultMethod';
import errorDeleteMethod from './errorDeleteMethod';
import errorGetMethod from './errorGetMethod';
import errorPostMethod from './errorPostMethod';

const errorInvitationsMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== `${INVITATIONS} ${API_ERROR}`) return;

        console.log(action);

        switch (action.meta.method) {
            case 'DELETE':
                errorDeleteMethod(dispatch, action);
                break;
            case 'GET':
                errorGetMethod(dispatch, action);
                break;
            case 'POST':
                errorPostMethod(dispatch, action);
                break;
            default:
                errorDefaultMethod(dispatch);
        }
    };

export default errorInvitationsMiddleware;
