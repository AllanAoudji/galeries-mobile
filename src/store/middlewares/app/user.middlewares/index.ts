import { Middleware } from 'redux';

import { END_POINT } from '#helpers/constants';
import {
    API_ERROR,
    API_SUCCESS,
    USER,
    USER_FETCH,
    apiRequest,
    setUser,
} from '#store/actions';

const errorUser: Middleware =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${USER} ${API_ERROR}`) {
            dispatch(setUser({ status: 'ERROR' }));
        }
    };

const fetchUser: Middleware =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === USER_FETCH) {
            dispatch(setUser({ status: 'FETCHING' }));
            dispatch(
                apiRequest({
                    entity: USER,
                    method: 'GET',
                    url: END_POINT.GET_ME,
                })
            );
        }
    };

const successUser: Middleware =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${USER} ${API_SUCCESS}`) {
            if (action.payload) {
                if (action.payload.data.action === 'GET') {
                    dispatch(
                        setUser({
                            data: action.payload.data.data.user,
                            status: 'SUCCESS',
                        })
                    );
                }
            }
        }
    };

export default [errorUser, fetchUser, successUser];
