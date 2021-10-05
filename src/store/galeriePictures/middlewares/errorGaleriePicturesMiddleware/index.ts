import { Middleware } from 'redux';

import { API_ERROR } from '#store/api/actionTypes';
import { dispatchErrorNotification } from '#store/dispatchers';
import { GALERIE_PICTURES } from '#store/genericActionTypes';

const errorGaleriePictures: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== `${GALERIE_PICTURES} ${API_ERROR}`) return;

        dispatchErrorNotification(dispatch, action);
    };

export default errorGaleriePictures;
