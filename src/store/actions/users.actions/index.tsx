type SetUsersParams = {
    byId?: { [key: string]: Store.Models.User };
};

export const USERS: Store.Entity = '[USERS]';

export const USERS_FETCH = `${USERS} Fetch`;
export const USERS_SET = `${USERS} Set`;

export const setUsers: (data: SetUsersParams) => Store.Action = (data) => ({
    payload: {
        data,
        meta: {},
    },
    type: USERS_SET,
});
