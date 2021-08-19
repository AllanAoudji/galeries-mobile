import { createSelector } from 'reselect';

export default createSelector(
    (state: Store.Reducer) => state.galeries.allIds,
    (galeriesAllIds) => galeriesAllIds
);
