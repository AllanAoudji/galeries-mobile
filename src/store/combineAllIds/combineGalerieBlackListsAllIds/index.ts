import uniqueArray from '#helpers/uniqueArray';

const combineGalerieBlackListsAllIds = (
    getState: () => Store.Reducer,
    oldAllIds: string[],
    newAllIds: string[]
) => {
    const galerieBlackListsById = getState().galerieBlackLists.byId;
    const allIds = uniqueArray([...oldAllIds, ...newAllIds]).sort((a, b) => {
        if (!galerieBlackListsById[a] || !galerieBlackListsById[b]) return 0;

        const autoIncrementIdA = +galerieBlackListsById[a].autoIncrementId;
        const autoIncrementIdB = +galerieBlackListsById[b].autoIncrementId;

        if (Number.isNaN(autoIncrementIdA) || Number.isNaN(autoIncrementIdB))
            return 0;

        return autoIncrementIdB - autoIncrementIdA;
    });
    return allIds;
};

export default combineGalerieBlackListsAllIds;
