import uniqueArray from '#helpers/uniqueArray';

const combineGaleriesAllIds = (
    getState: () => Store.Reducer,
    oldAllIds: string[],
    newAllIds: string[]
) => {
    const galeriesById = getState().galeries.byId;

    const allIds = uniqueArray([...oldAllIds, ...newAllIds]).sort((a, b) => {
        if (!galeriesById[a] || !galeriesById[b]) return 0;
        return galeriesById[b].hiddenName.localeCompare(
            galeriesById[a].hiddenName
        );
    });

    return allIds;
};

export default combineGaleriesAllIds;
