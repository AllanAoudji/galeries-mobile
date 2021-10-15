import { createSelector } from 'reselect';

const galeriesAllIdsSelector = (state: Store.Reducer) => state.galeries.allIds;
const galeriesByIdSelector = (state: Store.Reducer) => state.galeries.byId;
const galeriesCurrentSelector = (state: Store.Reducer) =>
    state.galeries.current;
const GaleriesStatusNameSelector = (state: Store.Reducer) =>
    state.galeries.status.name;
const galeriesStatusIdSelector = (state: Store.Reducer) =>
    state.galeries.status.id;
const galeriesFilterGaleriesNameSelector = (state: Store.Reducer) =>
    state.galeries.filterName;
const galeriesNameAllIdSelector = createSelector(
    [galeriesAllIdsSelector, galeriesFilterGaleriesNameSelector],
    (galeriesAllIds, galeriesFilterGaleriesName) => {
        return galeriesAllIds[galeriesFilterGaleriesName || ''];
    }
);

export const selectCurrentGalerie = createSelector(
    [galeriesByIdSelector, galeriesCurrentSelector],
    (galeriesById, galerieCurrent) =>
        galerieCurrent ? galeriesById[galerieCurrent] : undefined
);
export const selectGaleriesFieldsError = (state: Store.Reducer) =>
    state.galeries.fieldsError;
export const selectGaleriesFilterName = (state: Store.Reducer) =>
    state.galeries.filterName || '';
export const selectGalerie = (galerieId?: string | null) =>
    createSelector([galeriesByIdSelector], (byId) => {
        if (!galerieId) return undefined;
        return byId[galerieId];
    });
export const selectGaleriesAllIds = createSelector(
    [galeriesNameAllIdSelector],
    (allIds) => allIds || []
);
export const selectGalerieStatus = (galerieId?: string) =>
    createSelector([galeriesStatusIdSelector], (galeriesStatusId) => {
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
    [GaleriesStatusNameSelector, galeriesFilterGaleriesNameSelector],
    (galeriesStatusName, galeriesFilterGaleriesName) => {
        return (
            galeriesStatusName[galeriesFilterGaleriesName || ''] || 'PENDING'
        );
    }
);
