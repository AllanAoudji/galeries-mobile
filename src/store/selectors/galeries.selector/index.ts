import { createSelector } from 'reselect';

export default createSelector(
    (state: Store.Reducer) => state.galeries.allIdsByName,
    (state: Store.Reducer) => state.galeries.byId,
    (state: Store.Reducer) => state.UIStates.filters.galeries.name,
    (allIdsByName, byId, name) => {
        const galeries = allIdsByName[name];
        if (!galeries) return undefined;
        const { allIds } = galeries;

        return allIds
            ? allIds
                  .filter((id) => byId[id] !== undefined)
                  .map((id) => byId[id])
            : undefined;
    }
);
