type SetUserParams = {
    id?: string | null;
    status?: Store.Status;
};

export const ME: Store.Entity = '[ME]';

export const ME_FETCH = `${ME} Fetch`;
export const ME_SET = `${ME} Set`;

export const fetchMe: () => Store.Action = () => ({
    payload: {
        data: {},
        meta: {},
    },
    type: ME_FETCH,
});

export const resetMe: () => Store.Action = () => ({
    payload: {
        data: {
            data: null,
            status: 'PENDING',
        },
        meta: {},
    },
    type: ME_SET,
});

export const setMe: (params: SetUserParams) => Store.Action = ({
    id,
    status,
}) => ({
    payload: {
        data: {
            id,
            status,
        },
        meta: {},
    },
    type: ME_SET,
});
