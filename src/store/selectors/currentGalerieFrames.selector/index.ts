import { createSelector } from 'reselect';

export default createSelector(
    (state: Store.Reducer) => state.galeries.byId,
    (state: Store.Reducer) => state.UIStates.currentGalerieId,
    (state: Store.Reducer) => state.frames.byId,
    (byId, currentGalerieId, frameById) => {
        if (!currentGalerieId) return undefined;
        return (
            byId[currentGalerieId] ? byId[currentGalerieId].frames.allIds : []
        )
            .filter((id) => frameById[id] !== undefined)
            .map((id) => ({ id, ...frameById[id] }));
    }
);
