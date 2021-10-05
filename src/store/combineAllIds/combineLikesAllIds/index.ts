import uniqueArray from '#helpers/uniqueArray';

const combineLikesAllIds = (
    getState: () => Store.Reducer,
    oldAllIds: string[],
    newAllIds: string[]
) => {
    const likesById = getState().likes.byId;
    const allIds = uniqueArray([...oldAllIds, ...newAllIds]).sort((a, b) => {
        if (!likesById[a] || !likesById[b]) return 0;

        const autoIncrementIdA = +likesById[a].autoIncrementId;
        const autoIncrementIdB = +likesById[b].autoIncrementId;

        if (Number.isNaN(autoIncrementIdA) || Number.isNaN(autoIncrementIdB))
            return 0;

        return autoIncrementIdB - autoIncrementIdA;
    });
    return allIds;
};

export default combineLikesAllIds;
