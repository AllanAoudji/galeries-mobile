export const LOGOUT: Store.Entity = '[LOGOUT]';

export const LOGOUT_FETCH = `${LOGOUT} Fetch`;

export const fetchLogout: () => Store.Action = () => ({
    type: LOGOUT_FETCH,
});
