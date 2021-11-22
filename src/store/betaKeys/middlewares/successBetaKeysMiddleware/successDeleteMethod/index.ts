import { Dispatch } from 'redux';

import {
    removeBetaKeysAllId,
    removeBetaKeysById,
    updateBetaKeysLoadingDelete,
} from '#store/betaKeys/actionCreators';

const successDeleteMethod = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    if (typeof action.payload.data !== 'object') {
        dispatch(updateBetaKeysLoadingDelete('ERROR'));
        return;
    }

    const { betaKeyId } = action.payload.data;
    if (typeof betaKeyId !== 'string') {
        dispatch(updateBetaKeysLoadingDelete('ERROR'));
        return;
    }

    const betaKey = getState().betaKeys.byId[betaKeyId];
    if (!betaKey) return;

    dispatch(removeBetaKeysAllId(betaKeyId));
    dispatch(removeBetaKeysById(betaKeyId));
    dispatch(updateBetaKeysLoadingDelete('SUCCESS'));
};

export default successDeleteMethod;
