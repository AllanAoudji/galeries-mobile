import uniqueArray from '#helpers/uniqueArray';

const combineGaleriesAllIds = (
    getState: () => Store.Reducer,
    oldAllIds: string[],
    newAllIds: string[]
) => {
    const galeriesById = getState().galeries.byId;

    const allIds = uniqueArray([...oldAllIds, ...newAllIds]).sort((a, b) => {
        if (!galeriesById[a] || !galeriesById[b]) return 0;
        return galeriesById[a].hiddenName.localeCompare(
            galeriesById[b].hiddenName
        );
    });

    return allIds;
};

export default combineGaleriesAllIds;
