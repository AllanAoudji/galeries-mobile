import { Dispatch } from 'redux';

import {
    setBetaKeysAllIds,
    setBetaKeysById,
    updateBetaKeysEnd,
    updateBetaKeysPrevious,
    updateBetaKeysStatus,
} from '#store/betaKeys/actionCreators';
import { combineBetaKeysAllIds } from '#store/combineAllIds';
import { getUserId } from '#store/users/actionCreators';

const successGetMethod = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    console.log(action);
    if (typeof action.payload.data !== 'object') return;

    const allIds: string[] = [];
    const byId: { [key: string]: Store.Models.BetaKeys } = {};
    const { betaKey, betaKeys } = action.payload.data;
    if (betaKeys && Array.isArray(betaKeys))
        betaKeys.forEach((bk: Store.Models.BetaKeys) => {
            allIds.push(bk.id);
            byId[bk.id] = bk;
        });
    else if (betaKey && typeof betaKey === 'object') {
        allIds.push(betaKey.id);
        byId[betaKey.id] = betaKey;
    }

    dispatch(setBetaKeysById(byId));

    const previousBetaKeyId =
        allIds.length > 0 ? allIds[allIds.length - 1] : undefined;
    const previous = previousBetaKeyId
        ? byId[previousBetaKeyId].autoIncrementId
        : undefined;

    if (betaKey === undefined) {
        let oldsAllIds: string[];
        if (action.meta.refresh) oldsAllIds = [];
        else oldsAllIds = getState().betaKeys.allIds || [];
        const newAllIds = combineBetaKeysAllIds(getState, oldsAllIds, allIds);
        dispatch(setBetaKeysAllIds(newAllIds));
        dispatch(updateBetaKeysEnd(allIds.length < 20));
        if (previous) dispatch(updateBetaKeysPrevious(previous));
    }

    dispatch(updateBetaKeysStatus('SUCCESS'));

    allIds.forEach((id) => {
        if (!byId[id]) return;
        const { createdById, userId } = byId[id];
        if (createdById) {
            const createdBy = getState().users.byId[createdById];
            if (!createdBy) dispatch(getUserId(createdById));
        }
        if (userId) {
            const user = getState().users.byId[userId];
            if (!user) dispatch(getUserId(userId));
        }
    });
};

export default successGetMethod;
