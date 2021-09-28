import { Middleware } from 'redux';

import {
    USERS_RESET,
    resetUserCurrent,
    resetUsersAllIds,
    resetUsersById,
    resetUsersEnd,
    resetUsersPrevious,
    resetUsersStatus,
} from '#store/users';

const resetUsersMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === USERS_RESET) {
            dispatch(resetUsersAllIds());
            dispatch(resetUsersById());
            dispatch(resetUserCurrent());
            dispatch(resetUsersEnd());
            dispatch(resetUsersPrevious());
            dispatch(resetUsersStatus());
        }
    };

export default resetUsersMiddleware;
