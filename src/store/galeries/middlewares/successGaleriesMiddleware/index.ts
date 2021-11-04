import { Middleware } from 'redux';

import { API_SUCCESS } from '#store/api/actionTypes';
import { GALERIES } from '#store/genericActionTypes';

import successDefaultMethod from './successDefaultMethod';
import successDeleteGalerie from './successDeleteGalerie';
import successGetGaleries from './successGetGaleries';
import successPostGaleries from './successPostGaleries';
import successPutGalerie from './successPutGalerie';

const successGaleriesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== `${GALERIES} ${API_SUCCESS}`) return;

        switch (action.meta.method) {
            case 'DELETE':
                successDeleteGalerie(dispatch, action);
                break;
            case 'GET':
                successGetGaleries(dispatch, getState, action);
                break;
            case 'POST':
                successPostGaleries(dispatch, getState, action);
                break;
            case 'PUT':
                successPutGalerie(dispatch, getState, action);
                break;
            default:
                successDefaultMethod(dispatch);
        }
    };

export default successGaleriesMiddleware;
