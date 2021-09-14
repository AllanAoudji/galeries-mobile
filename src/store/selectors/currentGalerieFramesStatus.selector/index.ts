import { createSelector } from 'reselect';

export default createSelector(
    (state: Store.Reducer) => state.galeries.byId,
    (state: Store.Reducer) => state.UIStates.currentGalerieId,
    (byId, currentGalerieId) => {
        if (!currentGalerieId) return undefined;
        return byId[currentGalerieId]
            ? byId[currentGalerieId].frames.status
            : undefined;
    }
);
