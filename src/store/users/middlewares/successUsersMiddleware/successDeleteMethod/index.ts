import { Dispatch } from 'redux';

import {
    removeGalerieUserAllIds,
    updateUsersLoadingDelete,
} from '#store/users/actionCreators';

const successDeleteMethod = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    if (typeof action.payload.data !== 'object') {
        dispatch(updateUsersLoadingDelete('ERROR'));
        return;
    }
    const { galerieId, userId } = action.payload.data;
    if (typeof galerieId !== 'string') {
        dispatch(updateUsersLoadingDelete('ERROR'));
        return;
    }
    if (typeof userId !== 'string') {
        dispatch(updateUsersLoadingDelete('ERROR'));
        return;
    }

    dispatch(removeGalerieUserAllIds(galerieId, userId));
    dispatch(updateUsersLoadingDelete('SUCCESS'));
};

export default successDeleteMethod;
