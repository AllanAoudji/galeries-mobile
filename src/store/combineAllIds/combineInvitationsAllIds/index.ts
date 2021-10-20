import uniqueArray from '#helpers/uniqueArray';

const combineInvitationsAllIds = (
    getState: () => Store.Reducer,
    oldAllIds: string[],
    newAllIds: string[]
) => {
    const invitationsById = getState().invitations.byId;

    const allIds = uniqueArray([...oldAllIds, ...newAllIds]).sort((a, b) => {
        if (!invitationsById[a] || !invitationsById[b]) return 0;
        return (
            new Date(invitationsById[b].createdAt).getTime() -
            new Date(invitationsById[b].createdAt).getTime()
        );
    });

    return allIds;
};

export default combineInvitationsAllIds;
