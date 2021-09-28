import { Dispatch, Middleware } from 'redux';

import { API_ERROR } from '#store/api';
import {
    dispatchErrorNotification,
    dispatchUpdateGalerieFrames,
} from '#store/dispatchers';
import {
    updateFramesFieldsError,
    updateFramesLoadingDelete,
    updateFramesLoadingPost,
    updateFramesLoadingPut,
    updateFramesStatus,
} from '#store/frames';
import { FRAMES } from '#store/genericActionTypes';
import { getGalerie } from '#store/getters';
import { ERROR_MESSAGE } from '#helpers/constants';

const errorDefaultMethod = (dispatch: Dispatch<Store.Action>) =>
    dispatchErrorNotification(dispatch, ERROR_MESSAGE.METHOD_NOT_FOUND);
const errorDeleteMethod = (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => {
    dispatch(updateFramesLoadingDelete('ERROR'));
    dispatchErrorNotification(dispatch, action);
};
const errorGetMethod = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    const galerieId = action.meta.query
        ? action.meta.query.galerieId
        : undefined;
    if (galerieId) {
        const galerie = getGalerie(getState, galerieId);
        if (galerie)
            dispatchUpdateGalerieFrames(dispatch, galerie, {
                status: 'ERROR',
            });
    } else dispatch(updateFramesStatus('ERROR'));
    dispatchErrorNotification(dispatch, action);
};
const errorPostMethod = (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => {
    if (
        typeof action.payload === 'object' &&
        typeof action.payload.description === 'string'
    )
        dispatch(updateFramesFieldsError(action.payload));
    else dispatchErrorNotification(dispatch, action);
    dispatch(updateFramesLoadingPost('ERROR'));
};
const errorPutMethod = (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => {
    if (
        typeof action.payload === 'object' &&
        (typeof action.payload === 'object' ||
            typeof action.payload.description === 'string')
    )
        dispatch(updateFramesFieldsError(action.payload));
    else dispatchErrorNotification(dispatch, action.payload);
    dispatch(updateFramesLoadingPut('ERROR'));
};

const errorFramesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${FRAMES} ${API_ERROR}`) {
            switch (action.meta.method) {
                case 'DELETE':
                    errorDeleteMethod(dispatch, action);
                    break;
                case 'GET':
                    errorGetMethod(dispatch, getState, action);
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

export default errorFramesMiddleware;
