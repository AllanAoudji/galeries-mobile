import { Dispatch, Middleware } from 'redux';

import { ERROR_MESSAGE } from '#helpers/constants';
import { API_SUCCESS } from '#store/api';
import { dispatchErrorNotification } from '#store/dispatchers';
import {
    removeGaleriesById,
    resetGaleriesAllIds,
    resetGaleriesCurrent,
    resetGaleriesEnd,
    resetGaleriesFieldsError,
    resetGaleriesPrevious,
    resetGaleriesStatus,
    setGaleriesAllIds,
    setGaleriesById,
    updateGaleriesById,
    updateGaleriesCurrent,
    updateGaleriesEnd,
    updateGaleriesLoadingDelete,
    updateGaleriesLoadingPost,
    updateGaleriesLoadingPut,
    updateGaleriesPrevious,
    updateGaleriesStatus,
} from '#store/galeries';
import { getGalerie } from '#store/getters';
import { GALERIES } from '#store/genericActionTypes';

const successDefaultMethod = (dispatch: Dispatch<Store.Action>) =>
    dispatchErrorNotification(dispatch, ERROR_MESSAGE.METHOD_NOT_FOUND);

const successDeleteGalerie = (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => {
    const { galerieId } = action.payload.data;
    if (typeof galerieId === 'string') {
        dispatch(removeGaleriesById(galerieId));
        dispatch(resetGaleriesAllIds());
        dispatch(resetGaleriesCurrent());
        dispatch(resetGaleriesEnd());
        dispatch(resetGaleriesPrevious());
        dispatch(resetGaleriesStatus());
    }
    dispatch(updateGaleriesLoadingDelete('SUCCESS'));
};
const successGetGaleries = (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => {
    const allIds: string[] = [];
    const byId: { [key: string]: Store.Models.Galerie } = {};
    const { galerie, galeries } = action.payload.data;
    const name = action.meta.query ? action.meta.query.name : undefined;
    if (galeries && Array.isArray(galeries))
        galeries.forEach((g: Store.Models.Galerie) => {
            allIds.push(g.id);
            byId[g.id] = g;
        });
    else if (galerie && typeof galerie === 'object') {
        allIds.push(galerie.id);
        byId[galerie.id] = galerie;
    }
    dispatch(setGaleriesById(byId));
    if (name && allIds.length) {
        const previousGalerieId = allIds[allIds.length - 1];
        const previous = byId[previousGalerieId].hiddenName || '';
        dispatch(setGaleriesAllIds({ allIds }, name));
        dispatch(updateGaleriesEnd(allIds.length < 20, name));
        dispatch(updateGaleriesPrevious(previous, name));
        dispatch(updateGaleriesStatus('SUCCESS', name));
    }
};
const successPostGaleries = (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => {
    const { galerie } = action.payload.data;
    if (galerie && typeof galerie === 'object') {
        const byId = { [galerie.id]: galerie };
        dispatch(resetGaleriesAllIds());
        dispatch(resetGaleriesCurrent());
        dispatch(resetGaleriesEnd());
        dispatch(resetGaleriesFieldsError());
        dispatch(resetGaleriesPrevious());
        dispatch(setGaleriesById(byId));
        dispatch(updateGaleriesCurrent(galerie.id));
    }
    dispatch(updateGaleriesLoadingPost('SUCCESS'));
};
const successPutGalerie = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    const { galerie } = action.payload.data;
    if (
        galerie &&
        typeof galerie === 'object' &&
        typeof galerie.id === 'string'
    ) {
        const currentGalerie = getGalerie(getState, galerie.id);
        if (currentGalerie) {
            dispatch(
                updateGaleriesById({
                    ...currentGalerie,
                    ...galerie,
                })
            );
        }
    }
    dispatch(updateGaleriesLoadingPut('SUCCESS'));
};
const successGaleriesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${GALERIES} ${API_SUCCESS}`) {
            switch (action.meta.method) {
                case 'DELETE':
                    successDeleteGalerie(dispatch, action);
                    break;
                case 'GET':
                    successGetGaleries(dispatch, action);
                    break;
                case 'POST':
                    successPostGaleries(dispatch, action);
                    break;
                case 'PUT':
                    successPutGalerie(dispatch, getState, action);
                    break;
                default:
                    successDefaultMethod(dispatch);
            }
        }
    };

export default successGaleriesMiddleware;
