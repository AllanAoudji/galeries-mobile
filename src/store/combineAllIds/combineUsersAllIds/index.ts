import uniqueArray from '#helpers/uniqueArray';

const combineUsersAllIds = (
    getState: () => Store.Reducer,
    oldAllIds: string[],
    newAllIds: string[]
) => {
    const usersById = getState().users.byId;

    const allIds = uniqueArray([...oldAllIds, ...newAllIds]).sort((a, b) => {
        if (!usersById[a] || !usersById[b]) return 0;
        return usersById[a].userName.localeCompare(usersById[b].userName);
    });

    return allIds;
};

export default combineUsersAllIds;
