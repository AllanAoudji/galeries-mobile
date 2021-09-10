import { createSelector } from 'reselect';

export default createSelector(
    (state: Store.Reducer) => state.galeries.byId,
    (state: Store.Reducer) => state.UIStates.currentGalerieId,
    (byId, currentGalerieId) =>
        currentGalerieId
            ? { id: currentGalerieId, ...byId[currentGalerieId] }
            : undefined
);
