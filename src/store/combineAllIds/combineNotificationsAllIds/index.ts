import uniqueArray from '#helpers/uniqueArray';

const combineNotificationsAllIds = (
    getState: () => Store.Reducer,
    oldAllIds: string[],
    newAllIds: string[]
) => {
    const notificationsById = getState().notifications.byId;
    const allIds = uniqueArray([...oldAllIds, ...newAllIds]).sort((a, b) => {
        if (!notificationsById[a] || !notificationsById[b]) return 0;

        const autoIncrementIdA = +notificationsById[a].autoIncrementId;
        const autoIncrementIdB = +notificationsById[b].autoIncrementId;

        if (Number.isNaN(autoIncrementIdA) || Number.isNaN(autoIncrementIdB))
            return 0;

        return autoIncrementIdB - autoIncrementIdA;
    });

    return allIds;
};

export default combineNotificationsAllIds;
