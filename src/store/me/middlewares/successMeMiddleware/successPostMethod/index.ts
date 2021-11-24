import { Dispatch } from 'redux';

import { updateMeLoadingPut } from '#store/me/actionCreators';
import { updateNotification } from '#store/notification/actionCreators';

const successPostMethod = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    if (typeof action.payload !== 'object') return;
    if (typeof action.payload.data !== 'object') return;

    const { message } = action.payload.data;

    if (message && message === 'email send') {
        dispatch(
            updateNotification({
                status: 'success',
                text: 'an email has been send to you',
            })
        );
        const loading = getState().me.loading.put;
        if (loading.includes('LOADING'))
            dispatch(updateMeLoadingPut('SUCCESS'));
    }
};

export default successPostMethod;
