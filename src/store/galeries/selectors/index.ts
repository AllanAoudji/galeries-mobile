import { createSelector } from 'reselect';

const selectGaleriesAllIds = (state: Store.Reducer) => state.galeries.allIds;
const selectGaleriesById = (state: Store.Reducer) => state.galeries.byId;
const selectGaleriesCurrent = (state: Store.Reducer) => state.galeries.current;
const selectGaleriesStatusName = (state: Store.Reducer) =>
    state.galeries.status.name;
const selectGaleriesStatusId = (state: Store.Reducer) =>
    state.galeries.status.id;
const selectGaleriesFilterGaleriesName = (state: Store.Reducer) =>
    state.galeries.filterName;
const selectGaleriesNameAllId = createSelector(
    [selectGaleriesAllIds, selectGaleriesFilterGaleriesName],
    (galeriesAllIds, galeriesFilterGaleriesName) => {
        return galeriesAllIds[galeriesFilterGaleriesName || ''];
    }
);

export const selectCurrentGalerie = createSelector(
    [selectGaleriesById, selectGaleriesCurrent],
    (galeriesById, galerieCurrent) =>
        galerieCurrent ? galeriesById[galerieCurrent] : undefined
);
export const selectGaleriesFieldsError = (state: Store.Reducer) =>
    state.galeries.fieldsError;
export const selectGaleriesFilterName = (state: Store.Reducer) =>
    state.galeries.filterName;
export const selectGalerie = (galerieId?: string | null) =>
    createSelector([selectGaleriesById], (byId) => {
        if (!galerieId) return undefined;
        return byId[galerieId];
    });
export const selectGaleries = createSelector(
    [selectGaleriesNameAllId],
    (allIds) => allIds || []
);
export const selectGalerieStatus = (galerieId?: string) =>
    createSelector([selectGaleriesStatusId], (galeriesStatusId) => {
        if (!galerieId) return 'PENDING';
        return galeriesStatusId[galerieId] || 'PENDING';
    });
export const selectGaleriesLoadingDelete = (state: Store.Reducer) =>
    state.galeries.loading.delete;
export const selectGaleriesLoadingPost = (state: Store.Reducer) =>
    state.galeries.loading.post;
export const selectGaleriesLoadingPut = (state: Store.Reducer) =>
    state.galeries.loading.put;
export const selectGaleriesNameStatus = createSelector(
    [selectGaleriesStatusName, selectGaleriesFilterGaleriesName],
    (galeriesStatusName, galeriesFilterGaleriesName) => {
        return (
            galeriesStatusName[galeriesFilterGaleriesName || ''] || 'PENDING'
        );
    }
);
