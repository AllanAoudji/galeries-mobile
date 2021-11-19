import { Middleware } from 'redux';

import { API_SUCCESS } from '#store/api/actionTypes';
import { PROFILE_PICTURES } from '#store/genericActionTypes';

import successDefaultMethod from './successDefaultMethod';
import successDeleteProfilePicture from './successDeleteProfilePicture';
import successGetProfilePictures from './successGetProfilePictures';
import successPostProfilePictures from './successPostProfilePictures';
import successPutMethod from './successPutMethod';

const successProfilePicturesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    async (action: Store.Action) => {
        next(action);

        if (action.type !== `${PROFILE_PICTURES} ${API_SUCCESS}`) return;

        switch (action.meta.method) {
            case 'DELETE':
                successDeleteProfilePicture(dispatch, getState, action);
                break;
            case 'GET':
                await successGetProfilePictures(dispatch, getState, action);
                break;
            case 'POST':
                await successPostProfilePictures(dispatch, getState, action);
                break;
            case 'PUT':
                successPutMethod(dispatch, getState, action);
                break;
            default:
                successDefaultMethod(dispatch);
                break;
        }
    };

export default successProfilePicturesMiddleware;
