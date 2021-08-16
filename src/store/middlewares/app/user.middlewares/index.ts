import { Middleware } from 'redux';

import { END_POINT } from '#helpers/constants';
import {
    API_SUCCESS,
    USER,
    USER_FETCH,
    apiRequest,
    setUser,
} from '#store/actions';

const fetchUser: Middleware =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === USER_FETCH) {
            dispatch(
                apiRequest({
                    entity: USER,
                    method: 'GET',
                    url: END_POINT.GET_ME,
                })
            );
        }
    };

const getUser: Middleware =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${USER} ${API_SUCCESS}`) {
            if (action.payload) {
                if (action.payload.data.action === 'GET') {
                    dispatch(setUser(action.payload.data.data.user, 'SUCCESS'));
                }
            }
        }
    };

export default [fetchUser, getUser];
