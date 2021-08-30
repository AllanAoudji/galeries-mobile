import { createSelector } from 'reselect';

export default createSelector(
    (state: Store.Reducer) => state.galeries.allIdsByName,
    (state: Store.Reducer) => state.UIStates.filters.galeries.name,
    (allIdsByName, name) =>
        allIdsByName[name] ? allIdsByName[name].end : false
);
