import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { Middleware } from 'redux';

import { ASYNC_STORAGE, ERROR_MESSAGE } from '#helpers/constants';
import { API_SUCCESS } from '#store/api/actionTypes';
import { dispatchErrorNotification } from '#store/dispatchers';
import { LOGIN } from '#store/genericActionTypes';
import { getMe } from '#store/me/actionCreators';
import { updateLoginStatus } from '#store/login/actionCreators';

const successLoginMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${LOGIN} ${API_SUCCESS}`) {
            const { expiresIn, token } = action.payload.data;
            if (typeof expiresIn === 'number' && typeof token === 'string') {
                const normalizeExpiredIn = moment()
                    .add(expiresIn, 's')
                    .valueOf()
                    .toString();
                AsyncStorage.setItem(
                    ASYNC_STORAGE.AUTH_TOKEN_EXPIRES_IN,
                    normalizeExpiredIn
                )
                    .then(() =>
                        AsyncStorage.setItem(
                            ASYNC_STORAGE.AUTH_TOKEN_TOKEN,
                            token
                        )
                    )
                    .then(() => dispatch(getMe()));
            } else {
                dispatchErrorNotification(
                    dispatch,
                    ERROR_MESSAGE.DEFAULT_ERROR_MESSAGE
                );
            }
            dispatch(updateLoginStatus('SUCCESS'));
        }
    };

export default successLoginMiddleware;
