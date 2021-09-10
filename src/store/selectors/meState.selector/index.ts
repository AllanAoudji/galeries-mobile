import { createSelector } from 'reselect';

export default createSelector(
    (state: Store.Reducer) => state.me.status,
    (status) => status
);
