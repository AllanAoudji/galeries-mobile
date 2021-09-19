import { createSelector } from 'reselect';

export default createSelector(
    (state: Store.Reducer) => state.frames.status,
    (status) => status
);
