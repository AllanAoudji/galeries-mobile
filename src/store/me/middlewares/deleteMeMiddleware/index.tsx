import { Middleware } from 'redux';

import { dispatchDeleteMe } from '#store/dispatchers';
import { updateMeLoadingDelete } from '#store/me/actionCreators';
import { ME_DELETE } from '#store/me/actionTypes';

const deleteMeMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== ME_DELETE) return;
        const loading = getState().me.loading.delete;
        if (loading.includes('LOADING')) return;

        if (typeof action.payload !== 'object') return;
        if (typeof action.payload.deleteAccountSentence !== 'string') return;
        if (typeof action.payload.password !== 'string') return;
        if (typeof action.payload.userNameOrEmail !== 'string') return;

        dispatch(updateMeLoadingDelete('LOADING'));
        dispatchDeleteMe(dispatch, action.payload);
    };

export default deleteMeMiddleware;
