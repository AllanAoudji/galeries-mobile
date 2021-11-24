import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { Dispatch } from 'redux';

import { ASYNC_STORAGE, ERROR_MESSAGE } from '#helpers/constants';
import { updateMeLoadingPut } from '#store/me/actionCreators';
import { updateNotification } from '#store/notification/actionCreators';
import { updateUsersById } from '#store/users/actionCreators';
import { dispatchErrorNotification } from '#store/dispatchers';

const successPutMethod = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    if (typeof action.payload !== 'object') return;
    if (typeof action.payload.data !== 'object') return;

    const meId = getState().me.id;
    if (!meId) return;

    const me = getState().users.byId[meId];
    if (!me) return;

    const { expiresIn, hasNewNotifications, pseudonym, token } =
        action.payload.data;

    if (typeof hasNewNotifications === 'boolean')
        dispatch(
            updateUsersById({
                ...me,
                hasNewNotifications,
            })
        );

    if (typeof pseudonym === 'string') {
        dispatch(
            updateUsersById({
                ...me,
                pseudonym,
            })
        );
        dispatch(
            updateNotification({
                status: 'success',
                text: 'your pseudonym is successfully updated',
            })
        );
    }
    if (typeof expiresIn === 'number' && typeof token === 'string') {
        const normalizeExpiredIn = moment()
            .add(expiresIn, 's')
            .valueOf()
            .toString();
        AsyncStorage.setItem(
            ASYNC_STORAGE.AUTH_TOKEN_EXPIRES_IN,
            normalizeExpiredIn
        ).then(() =>
            AsyncStorage.setItem(ASYNC_STORAGE.AUTH_TOKEN_TOKEN, token)
        );
        dispatch(
            updateNotification({
                status: 'success',
                text: 'your password is successfully changed',
            })
        );
    }

    const loading = getState().me.loading.put;
    if (loading.includes('LOADING')) dispatch(updateMeLoadingPut('SUCCESS'));
};

export default successPutMethod;
