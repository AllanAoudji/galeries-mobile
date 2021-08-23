import { createSelector } from 'reselect';

export default createSelector(
    (state: Store.Reducer) => state.filters.galeries.name,
    (state: Store.Reducer) => state.galeries,
    (filter, galeries) =>
        galeries.allIdsByName[filter]
            ? galeries.allIdsByName[filter].status
            : 'PENDING'
);
