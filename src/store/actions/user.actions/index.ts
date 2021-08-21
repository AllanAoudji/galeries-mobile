type SetUserParams = {
    data?: Store.Models.User | null;
    status?: Store.Status;
};

export const USER: Store.Entity = '[USER]';

export const USER_FETCH = `${USER} Fetch`;
export const USER_SET = `${USER} Set`;

export const fetchUser: () => Store.Action = () => ({
    payload: {
        data: {},
        meta: {},
    },
    type: USER_FETCH,
});

export const resetUser: () => Store.Action = () => ({
    payload: {
        data: {
            data: null,
            status: 'PENDING',
        },
        meta: {},
    },
    type: USER_SET,
});

export const setUser: (params: SetUserParams) => Store.Action = ({
    data,
    status,
}) => ({
    payload: {
        data: {
            data,
            status,
        },
        meta: {},
    },
    type: USER_SET,
});
