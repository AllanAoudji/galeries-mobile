import { Dispatch } from 'redux';

import {
    resetGalerieBlackLists,
    setGalerieBlackListsAllIds,
    setGalerieBlackListsById,
    updateGalerieBlackListsLoadingPost,
} from '#store/galerieBlackLists/actionCreators';
import { combineGalerieBlackListsAllIds } from '#store/combineAllIds';
import { resetUsers } from '#store/users';

const successPostMethod = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    if (typeof action.payload.data !== 'object') {
        dispatch(updateGalerieBlackListsLoadingPost('ERROR'));
        return;
    }
    const { galerieBlackList } = action.payload.data;
    if (!galerieBlackList || typeof galerieBlackList !== 'object') {
        dispatch(updateGalerieBlackListsLoadingPost('ERROR'));
        return;
    }
    const allIds = [galerieBlackList.id];
    const byId = { [galerieBlackList.id]: galerieBlackList };

    dispatch(setGalerieBlackListsById(byId));

    const oldAllIds =
        getState().galerieBlackLists.allIds[galerieBlackList.galerieId] || [];
    const newAllIds = combineGalerieBlackListsAllIds(
        getState,
        oldAllIds,
        allIds
    );
    dispatch(setGalerieBlackListsAllIds(galerieBlackList.galerieId, newAllIds));
    dispatch(resetUsers());
    dispatch(resetGalerieBlackLists());
    dispatch(updateGalerieBlackListsLoadingPost('SUCCESS'));
};

export default successPostMethod;
