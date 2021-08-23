import { createSelector } from 'reselect';

export default createSelector(
    (state: Store.Reducer) => state.filters.galeries.name,
    (state: Store.Reducer) => state.galeries.allIdsByName,
    (filter, allIdsByName) =>
        allIdsByName[filter] ? allIdsByName[filter].allIds : []
);
