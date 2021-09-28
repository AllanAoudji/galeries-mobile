import { createSelector } from 'reselect';

const selectGaleriesAllIds = (state: Store.Reducer) => state.galeries.allIds;
const selectGaleriesById = (state: Store.Reducer) => state.galeries.byId;
const selectGaleriesCurrent = (state: Store.Reducer) => state.galeries.current;
const selectGaleriesStatus = (state: Store.Reducer) => state.galeries.status;
const selectGaleriesFilterGaleriesName = (state: Store.Reducer) =>
    state.galeries.filterName;
const selectGaleriesNameAllId = createSelector(
    [selectGaleriesAllIds, selectGaleriesFilterGaleriesName],
    (galeriesAllIds, galeriesFilterGaleriesName) =>
        galeriesAllIds[galeriesFilterGaleriesName]
);

export const selectCurrentGalerie = createSelector(
    [selectGaleriesById, selectGaleriesCurrent],
    (galeriesById, galerieCurrent) =>
        galerieCurrent ? galeriesById[galerieCurrent] : undefined
);
export const selectGaleriesFieldsError = (state: Store.Reducer) =>
    state.galeries.fieldsError;
export const selectGalerie = (id: string) =>
    createSelector([selectGaleriesById], (byId) => byId[id]);
export const selectGaleries = createSelector(
    [selectGaleriesNameAllId, selectGaleriesById],
    (allIds, byId) => {
        if (!allIds) return [];
        return allIds.map((id) => byId[id]).filter((galerie) => !!galerie);
    }
);
export const selectGaleriesLoadingDelete = (state: Store.Reducer) =>
    state.galeries.loading.delete;
export const selectGaleriesLoadingPost = (state: Store.Reducer) =>
    state.galeries.loading.post;
export const selectGaleriesLoadingPut = (state: Store.Reducer) =>
    state.galeries.loading.put;
export const selectGaleriesNameStatus = createSelector(
    [selectGaleriesStatus, selectGaleriesFilterGaleriesName],
    (galeriesStatus, galeriesFilterGaleriesName) =>
        galeriesStatus[galeriesFilterGaleriesName] || 'PENDING'
);
