import { createSelector } from 'reselect';

export default createSelector(
    (state: Store.Reducer) => state.user.status,
    (userStatus) => userStatus
);
