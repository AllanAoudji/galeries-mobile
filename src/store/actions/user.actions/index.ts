export const USER: Store.Entity = '[USER]';

export const USER_FETCH = `${USER} Fetch`;
export const USER_SET = `${USER} Set`;

export const fetchUser: () => Store.Action = () => ({
    type: USER_FETCH,
});

export const setUser: (
    data: Store.Models.User | null,
    status: Store.Status
) => Store.Action = (data, status) => ({
    payload: {
        data: {
            data,
            status,
        },
    },
    type: USER_SET,
});
