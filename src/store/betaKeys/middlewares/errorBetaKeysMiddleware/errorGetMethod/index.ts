import { Dispatch } from 'redux';

import {
    removeBetaKeysAllId,
    removeBetaKeysById,
    resetBetaKeysCurrent,
    updateBetaKeysStatus,
} from '#store/betaKeys/actionCreators';

const errorGetMethod = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    const betaKeyId = action.meta.query
        ? action.meta.query.betaKeyId
        : undefined;
    if (betaKeyId) {
        const betaKey = getState().betaKeys.byId[betaKeyId];
        if (betaKey) {
            dispatch(removeBetaKeysAllId(betaKeyId));
            dispatch(removeBetaKeysById(betaKeyId));
            const { current } = getState().betaKeys;
            if (current === betaKeyId) dispatch(resetBetaKeysCurrent());
        }
    }
    dispatch(updateBetaKeysStatus('ERROR'));
};

export default errorGetMethod;
