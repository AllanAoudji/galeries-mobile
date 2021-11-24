import { Dispatch } from 'redux';

import {
    removeGalerieBlackListsAllIds,
    removeGalerieBlackListsById,
    updateGalerieBlackListsStatus,
} from '#store/galerieBlackLists/actionCreators';

const errorGetMethod = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    const galerieId = action.meta.query
        ? action.meta.query.galerieId
        : undefined;
    const galerieBlackListId = action.meta.query
        ? action.meta.query.galerieBlackListId
        : undefined;

    if (galerieId) dispatch(updateGalerieBlackListsStatus(galerieId, 'ERROR'));
    if (galerieBlackListId) {
        const galerieBlackList =
            getState().galerieBlackLists.byId[galerieBlackListId];
        if (galerieBlackList) {
            dispatch(
                removeGalerieBlackListsAllIds(
                    galerieBlackList.galerieId,
                    galerieBlackListId
                )
            );
            dispatch(removeGalerieBlackListsById(galerieBlackListId));
        }
    }
};

export default errorGetMethod;
