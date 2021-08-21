import { Middleware } from 'redux';

import {
    API_ERROR,
    GALERIES,
    GALERIES_FETCH,
    apiRequest,
    setGaleries,
    API_SUCCESS,
    normalizeData,
    setNotification,
} from '#store/actions';
import { END_POINT, ERROR_MESSAGE } from '#helpers/constants';

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
                    action.payload.meta.query.name &&
                    action.payload.meta.query.name !== ''
                ) {
                    return getState().galeries.filters[
                        action.payload.meta.query.name
                    ]
                        ? !getState().galeries.filters[
                              action.payload.meta.query.name
                          ].end
                        : true;
                }
                return !getState().galeries.end;
            })();
            if (allowRequest) {
                let previousGalerie: string;
                if (
                    action.payload.meta.query &&
                    action.payload.meta.query.name &&
                    typeof action.payload.meta.query.name === 'string'
                ) {
                    previousGalerie = getState().galeries.filters[
                        action.payload.meta.query.name
                    ]
                        ? getState().galeries.filters[
                              action.payload.meta.query.name
                          ].previousGalerie
                        : '';
                } else {
                    previousGalerie = getState().galeries.previousGalerie;
                }
                const query = `?name=${
                    action.payload.meta.query &&
                    action.payload.meta.query.name &&
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
            if (
                action.payload.data.data &&
                action.payload.data.data.galeries &&
                Array.isArray(action.payload.data.data.galeries)
            ) {
                switch (action.payload.meta.method) {
                    case 'GET':
                        dispatch(
                            normalizeData({
                                data: action.payload.data.data.galeries.map(
                                    (galerie: any) => ({
                                        ...galerie,
                                        frames: [],
                                        users: [],
                                    })
                                ),
                                meta: {
                                    ...action.payload.meta,
                                    end:
                                        action.payload.data.data.galeries
                                            .length < 20,
                                },
                            })
                        );
                        break;
                    default:
                        dispatch(
                            setNotification({
                                status: 'error',
                                text: 'Method not found',
                            })
                        );
                }
            } else {
                dispatch(
                    setNotification({
                        status: 'error',
                        text: ERROR_MESSAGE.DEFAULT_ERROR_MESSAGE,
                    })
                );
            }
        }
    };

export default [errorGaleries, fetchGaleries, successGaleries];
