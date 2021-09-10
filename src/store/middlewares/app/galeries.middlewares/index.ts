import { Middleware } from 'redux';

import { END_POINT, ERROR_MESSAGE } from '#helpers/constants';
import normalizeData from '#helpers/normalizeData';
import normalizeGalerie from '#helpers/normalizeGalerie';
import {
    API_ERROR,
    GALERIES,
    GALERIES_FETCH,
    apiRequest,
    setGaleries,
    API_SUCCESS,
    setNotification,
} from '#store/actions';

const errorGaleries: Middleware =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${GALERIES} ${API_ERROR}`) {
            dispatch(setGaleries({ data: { status: 'ERROR' } }));
        }
    };

const fetchGaleries: Middleware =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${GALERIES_FETCH}`) {
            const allowRequest = (() => {
                if (
                    action.payload.meta.query &&
                    typeof action.payload.meta.query.name === 'string'
                ) {
                    return getState().galeries.allIdsByName[
                        action.payload.meta.query.name
                    ]
                        ? !getState().galeries.allIdsByName[
                              action.payload.meta.query.name
                          ].end
                        : true;
                }
                return false;
            })();
            if (allowRequest) {
                let previousGalerie: string;
                if (
                    action.payload.meta.query &&
                    typeof action.payload.meta.query.name === 'string'
                ) {
                    previousGalerie = getState().galeries.allIdsByName[
                        action.payload.meta.query.name
                    ]
                        ? getState().galeries.allIdsByName[
                              action.payload.meta.query.name
                          ].previousGalerie
                        : '';
                } else {
                    previousGalerie = '';
                }
                const query = `?name=${
                    action.payload.meta.query &&
                    typeof action.payload.meta.query.name === 'string'
                        ? action.payload.meta.query.name
                        : ''
                }&previousGalerie=${previousGalerie || ''}`;
                dispatch(
                    setGaleries({
                        data: {
                            status: 'FETCHING',
                        },
                        meta: action.payload.meta,
                    })
                );
                dispatch(
                    apiRequest({
                        data: {},
                        meta: {
                            ...action.payload.meta,
                            entity: GALERIES,
                            method: 'GET',
                            url: `${END_POINT.GALERIES}${query}`,
                        },
                    })
                );
            }
        }
    };

const successGaleries: Middleware =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${GALERIES} ${API_SUCCESS}`) {
            switch (action.payload.meta.method) {
                case 'GET':
                    if (action.payload.data.data) {
                        let normalize;
                        if (
                            action.payload.data.data.galeries &&
                            Array.isArray(action.payload.data.data.galeries)
                        ) {
                            const normalizedGaleries =
                                action.payload.data.data.galeries.map(
                                    (galerie: any) => normalizeGalerie(galerie)
                                );
                            normalize = normalizeData(normalizedGaleries);
                        } else if (
                            action.payload.data.data.galerie &&
                            typeof action.payload.data.data.galerie === 'object'
                        ) {
                            const normalizedGalerie = normalizeGalerie(
                                action.payload.data.data.galerie
                            );
                            normalize = normalizeData(normalizedGalerie);
                        } else {
                            dispatch(
                                setNotification({
                                    status: 'error',
                                    text: ERROR_MESSAGE.DEFAULT_ERROR_MESSAGE,
                                })
                            );
                            break;
                        }
                        dispatch({
                            payload: {
                                data: {
                                    ...normalize,
                                    status: 'SUCCESS',
                                },
                                meta: { ...action.payload.meta },
                            },
                            type: `${GALERIES} Set`,
                        });
                    }
                    break;
                default:
                    dispatch(
                        setNotification({
                            status: 'error',
                            text: 'Method not found',
                        })
                    );
            }
        }
    };

export default [errorGaleries, fetchGaleries, successGaleries];
