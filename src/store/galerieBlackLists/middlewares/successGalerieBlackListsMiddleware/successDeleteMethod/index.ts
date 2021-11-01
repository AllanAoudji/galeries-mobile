import { Dispatch } from 'redux';

import {
    removeGalerieBlackListsAllIds,
    resetGalerieBlackListsCurrent,
    removeGalerieBlackListsById,
    updateGalerieBlackListsLoadingDelete,
} from '#store/galerieBlackLists/actionCreators';

const successDeleteMethod = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    if (typeof action.payload.data !== 'object') {
        dispatch(updateGalerieBlackListsLoadingDelete('ERROR'));
        return;
    }
    const { blackListId } = action.payload.data;
    if (typeof blackListId !== 'string') {
        dispatch(updateGalerieBlackListsLoadingDelete('ERROR'));
        return;
    }
    const galerieBlackList = getState().galerieBlackLists.byId[blackListId];
    if (!galerieBlackList) {
        dispatch(updateGalerieBlackListsLoadingDelete('ERROR'));
        return;
    }

    dispatch(
        removeGalerieBlackListsAllIds(galerieBlackList.galerieId, blackListId)
    );
    dispatch(resetGalerieBlackListsCurrent());
    dispatch(removeGalerieBlackListsById(blackListId));
    dispatch(updateGalerieBlackListsLoadingDelete('SUCCESS'));
};

export default successDeleteMethod;
