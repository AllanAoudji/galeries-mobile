import { combineReducers, Dispatch, Middleware } from 'redux';
import { createSelector } from 'reselect';
import {
    BY_ID,
    GALERIE_PICTURES,
    GET,
    RESET,
    SET,
} from '#store/genericActionTypes';
import { apiRequest, API_ERROR, API_SUCCESS } from '#store/api';
import { END_POINT, ERROR_MESSAGE } from '#helpers/constants';
import { updateFramesById } from '#store/frames';
import { updateGaleriesById } from '#store/galeries';
import { dispatchErrorNotification } from '#store/notification';
import { setLoading } from '#store/loading';

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Action types
// ----------------------------------
// ----------------------------------
// ----------------------------------
const GALERIE_PICTURES_GET = `${GALERIE_PICTURES} ${GET}`;
const GALERIE_PICTURES_RESET = `${GALERIE_PICTURES} ${RESET}`;

const GALERIES_PICTURES_BY_ID_RESET = `${GALERIE_PICTURES}${BY_ID} ${RESET}`;
const GALERIE_PICTURES_BY_ID_SET = `${GALERIE_PICTURES}${BY_ID} ${SET}`;

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Action creators
// ----------------------------------
// ----------------------------------
// ----------------------------------
export const getFrameGaleriePictures: (frameId: string) => Store.Action = (
    frameId
) => ({
    meta: { query: { frameId } },
    payload: {},
    type: GALERIE_PICTURES_GET,
});
export const getGalerieCurrentCoverPicture: (
    galerieId: string
) => Store.Action = (galerieId) => ({
    meta: { query: { galerieId } },
    payload: {},
    type: GALERIE_PICTURES_GET,
});
export const resetGaleriePictures: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: GALERIE_PICTURES_RESET,
});

const resetGaleriePicturesById: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: GALERIES_PICTURES_BY_ID_RESET,
});
const setGaleriePicturesById: (payload: {
    [key: string]: Store.Models.GaleriePicture;
}) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: GALERIE_PICTURES_BY_ID_SET,
});

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Dispatchers
// ----------------------------------
// ----------------------------------
// ----------------------------------
const dispatchFrameGaleriePictures = (
    dispatch: Dispatch<Store.Action>,
    frame: Store.Models.Frame,
    galeriePictures: {
        allIds?: string[];
        status?: Store.Status;
    }
) => {
    const defaultGaleriePictures: { allIds: string[]; status: Store.Status } = {
        allIds: [],
        status: 'PENDING',
    };
    dispatch(
        updateFramesById({
            ...frame,
            galeriePictures: {
                ...(frame.galeriePictures || defaultGaleriePictures),
                ...galeriePictures,
            },
        })
    );
};
const dispatchGalerieCoverPicture = (
    dispatch: Dispatch<Store.Action>,
    galerie: Store.Models.Galerie,
    coverPicture: {
        id?: string | null;
        status?: Store.Status;
    }
) => {
    const defaultCoverPicture: { id: string | null; status: Store.Status } = {
        id: null,
        status: 'PENDING',
    };
    dispatch(
        updateGaleriesById({
            ...galerie,
            coverPicture: {
                ...(galerie.coverPicture || defaultCoverPicture),
                ...coverPicture,
            },
        })
    );
};
const dispatchGetFrameGaleriePictures = (
    dispatch: Dispatch<Store.Action>,
    frameId: string
) => {
    dispatch(
        apiRequest({
            meta: {
                query: { frameId },
                entity: GALERIE_PICTURES,
                method: 'GET',
                url: END_POINT.FRAMES_GALERIE_PICTURES(frameId),
            },
            payload: {},
        })
    );
};
const dispatchGetGalerieCurrentCoverPicture = (
    dispatch: Dispatch<Store.Action>,
    galerieId: string
) => {
    dispatch(
        apiRequest({
            meta: {
                query: { galerieId },
                entity: GALERIE_PICTURES,
                method: 'GET',
                url: END_POINT.GALERIE_COVER_PICTURE(galerieId),
            },
            payload: {},
        })
    );
};

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Middlewared
// ----------------------------------
// ----------------------------------
// ----------------------------------
const getFrame = (getState: () => Store.Reducer, frameId: string) =>
    getState().frames.byId[frameId];
const getGalerie = (getState: () => Store.Reducer, galerieId: string) =>
    getState().galeries.byId[galerieId];

const errorGaleriePictures: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${GALERIE_PICTURES} ${API_ERROR}`) {
            const frameId = action.meta.query
                ? action.meta.query.frameId
                : undefined;
            const galerieId = action.meta.query
                ? action.meta.query.galerieId
                : undefined;
            if (typeof frameId === 'string') {
                const frame = getFrame(getState, frameId);
                if (frame)
                    dispatchFrameGaleriePictures(dispatch, frame, {
                        status: 'ERROR',
                    });
            } else if (typeof galerieId === 'string') {
                const galerie = getGalerie(getState, galerieId);
                if (galerie)
                    dispatchGalerieCoverPicture(dispatch, galerie, {
                        status: 'ERROR',
                    });
            }
            dispatchErrorNotification(dispatch, action);
            dispatch(setLoading(false));
        }
    };
const getGaleriePicturesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === GALERIE_PICTURES_GET) {
            const frameId = action.meta.query
                ? action.meta.query.frameId
                : undefined;
            const galerieId = action.meta.query
                ? action.meta.query.galerieId
                : undefined;
            if (typeof frameId === 'string') {
                const frame = getFrame(getState, frameId);
                const galeriePicturesStatus =
                    frame && frame.galeriePictures
                        ? frame.galeriePictures.status
                        : 'PENDING';
                if (frame && !galeriePicturesStatus.includes('LOADING')) {
                    dispatchFrameGaleriePictures(dispatch, frame, {
                        status: 'LOADING',
                    });
                    dispatchGetFrameGaleriePictures(dispatch, frameId);
                }
            } else if (typeof galerieId === 'string') {
                const galerie = getGalerie(getState, galerieId);
                const galeriepictureStatus =
                    galerie && galerie.coverPicture
                        ? galerie.coverPicture.status
                        : 'PENDING';
                if (galerie && !galeriepictureStatus.includes('LOADING')) {
                    dispatchGalerieCoverPicture(dispatch, galerie, {
                        status: 'LOADING',
                    });
                    dispatchGetGalerieCurrentCoverPicture(dispatch, galerieId);
                }
            }
        }
    };
const resetGaleriePicturesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === GALERIE_PICTURES_RESET)
            dispatch(resetGaleriePicturesById());
    };
const successDefaultMethod = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    const frameId = action.meta.query ? action.meta.query.frameId : undefined;
    const galerieId = action.meta.query
        ? action.meta.query.galerieId
        : undefined;
    if (typeof frameId === 'string') {
        const frame = getFrame(getState, frameId);
        if (frame)
            dispatchFrameGaleriePictures(dispatch, frame, {
                status: 'ERROR',
            });
    } else if (typeof galerieId === 'string') {
        const galerie = getGalerie(getState, galerieId);
        if (galerie)
            dispatchGalerieCoverPicture(dispatch, galerie, {
                status: 'ERROR',
            });
    }
    dispatchErrorNotification(dispatch, ERROR_MESSAGE.METHOD_NOT_FOUND);
};
const successGetGaleriePictures = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    const frameId = action.meta.query ? action.meta.query.frameId : undefined;
    const galerieId = action.meta.query
        ? action.meta.query.galerieId
        : undefined;
    const byId: { [key: string]: Store.Models.GaleriePicture } = {};
    const allIds: string[] = [];
    let id: string | undefined;
    const { galeriePicture, galeriePictures } = action.payload.data.data;
    if (galeriePictures && Array.isArray(galeriePictures)) {
        galeriePictures.forEach((gp: Store.Models.GaleriePicture) => {
            allIds.push(gp.id);
            byId[gp.id] = gp;
        });
    } else if (galeriePicture && typeof galeriePicture === 'object') {
        byId[galeriePicture.id] = galeriePicture;
        id = galeriePicture.id;
    }
    dispatch(setGaleriePicturesById(byId));
    if (allIds.length && typeof frameId === 'string') {
        const frame = getFrame(getState, frameId);
        if (frame)
            dispatchFrameGaleriePictures(dispatch, frame, {
                allIds,
                status: 'SUCCESS',
            });
    } else if (typeof id === 'string' && typeof galerieId === 'string') {
        const galerie = getGalerie(getState, galerieId);
        if (galerie)
            dispatchGalerieCoverPicture(dispatch, galerie, {
                id,
                status: 'SUCCESS',
            });
    }
};
const successGaleriePicturesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${GALERIE_PICTURES} ${API_SUCCESS}`) {
            switch (action.meta.method) {
                case 'GET':
                    successGetGaleriePictures(dispatch, getState, action);
                    break;
                default:
                    successDefaultMethod(dispatch, getState, action);
            }
        }
    };

export const galeriePicturesMiddlwares = [
    errorGaleriePictures,
    getGaleriePicturesMiddleware,
    resetGaleriePicturesMiddleware,
    successGaleriePicturesMiddleware,
];

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Reducers
// ----------------------------------
// ----------------------------------
// ----------------------------------
const galeriePicturesByIdState: { [key: string]: Store.Models.GaleriePicture } =
    {};
const galeriePicturesByIdReducer = (
    state = galeriePicturesByIdState,
    action: Store.Action
) => {
    switch (action.type) {
        case GALERIES_PICTURES_BY_ID_RESET:
            return galeriePicturesByIdState;
        case GALERIE_PICTURES_BY_ID_SET:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Combined reducers
// ----------------------------------
// ----------------------------------
// ----------------------------------
export const galeriePicturesReducer = combineReducers({
    byId: galeriePicturesByIdReducer,
});

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Selectors
// ----------------------------------
// ----------------------------------
// ----------------------------------
const selectFramesById = (state: Store.Reducer) => state.frames.byId;
const selectGaleriesById = (state: Store.Reducer) => state.galeries.byId;
const selectGaleriePicturesById = (state: Store.Reducer) =>
    state.galeriePictures.byId;

export const selectFrameGaleriePictures = (id: string) =>
    createSelector(
        [selectFramesById, selectGaleriePicturesById],
        (frameById, galeriePicturesById) => {
            const frame = frameById[id];
            if (!frame || !frame.galeriePictures) return undefined;
            const { allIds } = frame.galeriePictures;
            return allIds
                .map(
                    (galeriePicturesId) =>
                        galeriePicturesById[galeriePicturesId]
                )
                .filter((galeriePictures) => !!galeriePictures);
        }
    );
export const selectGalerieCoverPicture = (id: string) =>
    createSelector(
        [selectGaleriesById, selectGaleriePicturesById],
        (galeriesById, galeriePicturesById) => {
            const galerie = galeriesById[id];
            if (!galerie || !galerie.coverPicture) return undefined;
            const { id: galeriePictureId } = galerie.coverPicture;
            if (!galeriePictureId) return undefined;
            return galeriePicturesById[galeriePictureId];
        }
    );
