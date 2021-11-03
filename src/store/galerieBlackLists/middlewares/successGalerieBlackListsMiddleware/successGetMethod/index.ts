import { Dispatch } from 'redux';

import { combineGalerieBlackListsAllIds } from '#store/combineAllIds';
import {
    setGalerieBlackListsAllIds,
    setGalerieBlackListsById,
    updateGalerieBlackListsPrevious,
    updateGalerieBlackListsStatus,
    updateGalerieBlackLitstsEnd,
} from '#store/galerieBlackLists/actionCreators';
import { getUserId } from '#store/users/actionCreators';

const successGetMethod = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    if (typeof action.payload.data !== 'object') return;

    const allIds: string[] = [];
    const byId: { [key: string]: Store.Models.GalerieBlackList } = {};
    const { galerieBlackList, galerieBlackLists } = action.payload.data;
    if (galerieBlackLists && Array.isArray(galerieBlackLists))
        galerieBlackLists.forEach((gbl: Store.Models.GalerieBlackList) => {
            allIds.push(gbl.id);
            byId[gbl.id] = gbl;
        });
    else if (galerieBlackList && typeof galerieBlackList === 'object') {
        allIds.push(galerieBlackList.id);
        byId[galerieBlackList.id] = galerieBlackList;
    }

    dispatch(setGalerieBlackListsById(byId));

    const galerieId = action.meta.query
        ? action.meta.query.galerieId
        : undefined;
    const previousGalerieBlackListId =
        allIds.length > 0 ? allIds[allIds.length - 1] : undefined;
    const previous = previousGalerieBlackListId
        ? byId[previousGalerieBlackListId].autoIncrementId
        : undefined;

    if (galerieId) {
        if (galerieBlackList === undefined) {
            let oldAllIds: string[];
            if (action.meta.refresh) oldAllIds = [];
            else
                oldAllIds =
                    getState().galerieBlackLists.allIds[galerieId] || [];
            const newAllIds = combineGalerieBlackListsAllIds(
                getState,
                oldAllIds,
                allIds
            );

            dispatch(setGalerieBlackListsAllIds(galerieId, newAllIds));
            dispatch(
                updateGalerieBlackLitstsEnd(galerieId, allIds.length < 20)
            );
            if (previous)
                dispatch(updateGalerieBlackListsPrevious(galerieId, previous));
        }

        dispatch(updateGalerieBlackListsStatus(galerieId, 'SUCCESS'));
    }

    allIds.forEach((id) => {
        const createdBy = getState().users.byId[byId[id].createdById];
        if (!createdBy) dispatch(getUserId(byId[id].createdById));

        const user = getState().users.byId[byId[id].userId];
        if (!user) dispatch(getUserId(byId[id].userId));
    });
};

export default successGetMethod;
