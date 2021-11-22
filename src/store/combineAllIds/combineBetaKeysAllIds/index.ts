import uniqueArray from '#helpers/uniqueArray';

const combineBetaKeysAllIds = (
    getState: () => Store.Reducer,
    oldAllIds: string[],
    newAllIds: string[]
) => {
    const betaKeysById = getState().betaKeys.byId;
    const allIds = uniqueArray([...oldAllIds, ...newAllIds]).sort((a, b) => {
        if (!betaKeysById[a] || !betaKeysById[b]) return 0;

        const autoIncrementIdA = +betaKeysById[a].autoIncrementId;
        const autoIncrementIdB = +betaKeysById[b].autoIncrementId;

        if (Number.isNaN(autoIncrementIdA) || Number.isNaN(autoIncrementIdB))
            return 0;

        return autoIncrementIdB - autoIncrementIdA;
    });

    return allIds;
};

export default combineBetaKeysAllIds;
