import { createSelector } from 'reselect';

export default createSelector(
    (state: Store.Reducer) => state.galeries.allIdsByName,
    (state: Store.Reducer) => state.galeries.byId,
    (state: Store.Reducer) => state.UIStates.filters.galeries.name,
    (allIdsByName, byId, name) => {
        return allIdsByName[name]
            ? allIdsByName[name].allIds
                  .filter((id) => byId[id] !== undefined)
                  .map((id) => ({ id, ...byId[id] }))
            : [];
    }
);
