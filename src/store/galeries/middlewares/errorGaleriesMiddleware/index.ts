import { Dispatch, Middleware } from 'redux';

import { ERROR_MESSAGE } from '#helpers/constants';
import { API_ERROR } from '#store/api/actionTypes';
import { dispatchErrorNotification } from '#store/dispatchers';
import {
    updateGaleriesFieldsError,
    updateGaleriesLoadingDelete,
    updateGaleriesLoadingPost,
    updateGaleriesLoadingPut,
    updateGaleriesStatusId,
} from '#store/galeries/actionCreators';
import { GALERIES } from '#store/genericActionTypes';

const errorDefaultMethod = (dispatch: Dispatch<Store.Action>) =>
    dispatchErrorNotification(dispatch, ERROR_MESSAGE.METHOD_NOT_FOUND);
const errorDeleteMethod = (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => {
    if (
        typeof action.payload === 'object' &&
        (typeof action.payload.name === 'string' ||
            typeof action.payload.password === 'string')
    )
        dispatch(updateGaleriesFieldsError(action.payload));
    else dispatchErrorNotification(dispatch, action);
    dispatch(updateGaleriesLoadingDelete('ERROR'));
};
const errorGetMethod = (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => {
    const name = action.meta.query ? action.meta.query.name : undefined;
    if (name) dispatch(updateGaleriesStatusId('ERROR', name));
    dispatchErrorNotification(dispatch, action);
};
const errorPostMethod = (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => {
    if (
        typeof action.payload === 'object' &&
        (typeof action.payload.description === 'string' ||
            typeof action.payload.name === 'string')
    )
        dispatch(updateGaleriesFieldsError(action.payload));
    else dispatchErrorNotification(dispatch, action);
    dispatch(updateGaleriesLoadingPost('ERROR'));
};
const errorPutMethod = (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => {
    if (
        typeof action.payload === 'object' &&
        (typeof action.payload.description === 'string' ||
            typeof action.payload.name === 'string')
    )
        dispatch(updateGaleriesFieldsError(action.payload));
    else dispatchErrorNotification(dispatch, action.payload);
    dispatch(updateGaleriesLoadingPut('ERROR'));
};
const errorGaleriesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${GALERIES} ${API_ERROR}`) {
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
                case 'PUT':
                    errorPutMethod(dispatch, action);
                    break;
                default:
                    errorDefaultMethod(dispatch);
            }
        }
    };

export default errorGaleriesMiddleware;
