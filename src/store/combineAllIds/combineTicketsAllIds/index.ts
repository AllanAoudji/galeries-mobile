import uniqueArray from '#helpers/uniqueArray';

const combineTicketsAllIds = (
    getState: () => Store.Reducer,
    oldAllIds: string[],
    newAllIds: string[]
) => {
    const ticketsById = getState().tickets.byId;
    const allIds = uniqueArray([...oldAllIds, ...newAllIds]).sort((a, b) => {
        if (!ticketsById[a] || !ticketsById[b]) return 0;

        const autoIncrementIdA = +ticketsById[a].autoIncrementId;
        const autoIncrementIdB = +ticketsById[b].autoIncrementId;

        if (Number.isNaN(autoIncrementIdA) || Number.isNaN(autoIncrementIdB))
            return 0;

        return autoIncrementIdB - autoIncrementIdA;
    });

    return allIds;
};

export default combineTicketsAllIds;
