import AsyncStorage from '@react-native-async-storage/async-storage';
import { Middleware } from 'redux';

import { ASYNC_STORAGE } from '#helpers/constants';
import { dispatchGetMe } from '#store/dispatchers';
import { updateMeStatus } from '#store/me/actionCreators';
import { ME_GET } from '#store/me/actionTypes';

const getMeMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    async (action: Store.Action) => {
        next(action);

        if (action.type !== ME_GET) return;

        const meStatus = getState().me.status;
        if (meStatus.includes('LOADING')) return;

        let expiresIn: string | null = null;
        let token: string | null = null;
        try {
            expiresIn = await AsyncStorage.getItem(
                ASYNC_STORAGE.AUTH_TOKEN_EXPIRES_IN
            );
            token = await AsyncStorage.getItem(ASYNC_STORAGE.AUTH_TOKEN_TOKEN);
        } catch (err) {
            await AsyncStorage.clear();
            dispatch(updateMeStatus('ERROR'));
            return;
        }

        if (!expiresIn || !token) {
            dispatch(updateMeStatus('SUCCESS'));
            return;
        }

        const { status } = getState().me;
        const newStatus: Store.Status =
            status === 'PENDING' ? 'INITIAL_LOADING' : 'LOADING';

        dispatch(updateMeStatus(newStatus));
        dispatchGetMe(dispatch, action);
    };

export default getMeMiddleware;
