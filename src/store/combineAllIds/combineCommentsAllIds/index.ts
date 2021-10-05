import uniqueArray from '#helpers/uniqueArray';

const combineCommentsAllIds = (
    getState: () => Store.Reducer,
    oldAllIds: string[],
    newAllIds: string[]
) => {
    const commentsById = getState().comments.byId;
    const allIds = uniqueArray([...oldAllIds, ...newAllIds]).sort((a, b) => {
        if (!commentsById[a] || !commentsById[b]) return 0;

        const autoIncrementIdA = +commentsById[a].autoIncrementId;
        const autoIncrementIdB = +commentsById[b].autoIncrementId;

        if (Number.isNaN(autoIncrementIdA) || Number.isNaN(autoIncrementIdB))
            return 0;

        return autoIncrementIdB - autoIncrementIdA;
    });
    return allIds;
};

export default combineCommentsAllIds;
