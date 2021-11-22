import { Dispatch } from 'redux';

import {
    setBetaKeysAllIds,
    setBetaKeysById,
    updateBetaKeysLoadingPost,
} from '#store/betaKeys/actionCreators';
import { combineBetaKeysAllIds } from '#store/combineAllIds';

const successPostMethod = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    if (typeof action.payload.data !== 'object') {
        dispatch(updateBetaKeysLoadingPost('ERROR'));
        return;
    }

    const { betaKey } = action.payload.data;
    if (betaKey === undefined) {
        dispatch(updateBetaKeysLoadingPost('ERROR'));
        return;
    }

    const betaKeysAllIds: string[] = [betaKey.id];
    const betaKeysById: { [key: string]: Store.Models.BetaKeys } = {
        [betaKey.id]: { ...betaKey },
    };

    dispatch(setBetaKeysById(betaKeysById));

    const betaKeysOldsAllIds = getState().betaKeys.allIds;
    const betaKeysNewAllIds = combineBetaKeysAllIds(
        getState,
        betaKeysOldsAllIds,
        betaKeysAllIds
    );
    dispatch(setBetaKeysAllIds(betaKeysNewAllIds));
    dispatch(updateBetaKeysLoadingPost('SUCCESS'));
};

export default successPostMethod;
