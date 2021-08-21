export const LOGOUT: Store.Entity = '[LOGOUT]';

export const LOGOUT_FETCH = `${LOGOUT} Fetch`;

export const fetchLogout: () => Store.Action = () => ({
    payload: {
        data: {},
        meta: {},
    },
    type: LOGOUT_FETCH,
});
