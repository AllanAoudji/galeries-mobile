import { Middleware } from 'redux';

import { API_SUCCESS } from '#store/api/actionTypes';
import { GALERIE_PICTURES } from '#store/genericActionTypes';

import successDefaultMethod from './successDefaultMethod';
import successGetGaleriePictures from './successGetGaleriePictures';

const successGaleriePicturesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    async (action: Store.Action) => {
        next(action);
        if (action.type === `${GALERIE_PICTURES} ${API_SUCCESS}`) {
            switch (action.meta.method) {
                case 'GET':
                    await successGetGaleriePictures(dispatch, getState, action);
                    break;
                default:
                    successDefaultMethod(dispatch);
            }
        }
    };

export default successGaleriePicturesMiddleware;
