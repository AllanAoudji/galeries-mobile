import uniqueArray from '#helpers/uniqueArray';

const combineProfilePicturesAllIds = (
    getState: () => Store.Reducer,
    oldAllIds: string[],
    newAllIds: string[]
) => {
    const profilePicturesById = getState().profilePictures.byId;
    const allIds = uniqueArray([...oldAllIds, ...newAllIds]).sort((a, b) => {
        if (!profilePicturesById[a] || !profilePicturesById[b]) return 0;

        const autoIncrementIdA = +profilePicturesById[a].autoIncrementId;
        const autoIncrementIdB = +profilePicturesById[b].autoIncrementId;

        if (Number.isNaN(autoIncrementIdA) || Number.isNaN(autoIncrementIdB))
            return 0;

        return autoIncrementIdB - autoIncrementIdA;
    });

    return allIds;
};

export default combineProfilePicturesAllIds;
