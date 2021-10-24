import uniqueArray from '#helpers/uniqueArray';

const combineInvitationsAllIds = (
    getState: () => Store.Reducer,
    oldAllIds: string[],
    newAllIds: string[]
) => {
    const invitationsById = getState().invitations.byId;

    const allIds = uniqueArray([...oldAllIds, ...newAllIds]).sort((a, b) => {
        if (!invitationsById[a] || !invitationsById[b]) return 0;

        const autoIncrementIdA = +invitationsById[a].autoIncrementId;
        const autoIncrementIdB = +invitationsById[b].autoIncrementId;

        if (Number.isNaN(autoIncrementIdA) || Number.isNaN(autoIncrementIdB))
            return 0;

        return autoIncrementIdB - autoIncrementIdA;
    });

    return allIds;
};

export default combineInvitationsAllIds;
