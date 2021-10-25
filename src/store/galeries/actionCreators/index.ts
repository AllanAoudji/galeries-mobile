import {
    GALERIES_ALL_IDS_RESET,
    GALERIES_ALL_IDS_SET,
    GALERIES_BY_ID_REMOVE,
    GALERIES_BY_ID_RESET,
    GALERIES_BY_ID_SET,
    GALERIES_BY_UD_UPDATE,
    GALERIES_CURRENT_RESET,
    GALERIES_CURRENT_UPDATE,
    GALERIES_DELETE,
    GALERIES_END_RESET,
    GALERIES_END_UPDATE,
    GALERIES_FIELDS_ERROR_RESET,
    GALERIES_FIELDS_ERROR_UPDATE,
    GALERIES_FILTER_NAME_RESET,
    GALERIES_FILTER_NAME_UPDATE,
    GALERIES_GET,
    GALERIES_LOADING_DELETE_RESET,
    GALERIES_LOADING_DELETE_UPDATE,
    GALERIES_LOADING_POST_RESET,
    GALERIES_LOADING_POST_UPDATE,
    GALERIES_LOADING_PUT_RESET,
    GALERIES_LOADING_PUT_UPDATE,
    GALERIES_POST,
    GALERIES_PREVIOUS_RESET,
    GALERIES_PREVIOUS_UPDATE,
    GALERIES_PUT,
    GALERIES_RESET,
    GALERIES_STATUS_ID_RESET,
    GALERIES_STATUS_ID_UPDATE,
    GALERIES_STATUS_NAME_RESET,
    GALERIES_STATUS_NAME_UPDATE,
} from '#store/galeries/actionTypes';

export const deleteGalerie: (payload: string) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: GALERIES_DELETE,
});
export const getGalerieId: (payload: string) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: GALERIES_GET,
});
export const getGaleries: (name?: string) => Store.Action = (name) => ({
    meta: { query: { name: name || '' } },
    payload: {},
    type: GALERIES_GET,
});
export const postGalerie: (payload: {
    name: string;
    description: string;
}) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: GALERIES_POST,
});
export const putGalerie: (
    galerieId: string,
    payload: {
        name: string;
        description: string;
    }
) => Store.Action = (galerieId, payload) => ({
    meta: { query: { galerieId } },
    payload,
    type: GALERIES_PUT,
});
export const putGalerieNotification: (galerieId: string) => Store.Action = (
    galerieId
) => ({
    meta: { query: { galerieId } },
    payload: {},
    type: GALERIES_PUT,
});
export const removeGaleriesById: (payload: string) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: GALERIES_BY_ID_REMOVE,
});
export const resetGaleries: () => Store.Action = () => ({
    payload: {},
    meta: {},
    type: GALERIES_RESET,
});
export const resetGaleriesAllIds: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: GALERIES_ALL_IDS_RESET,
});
export const resetGaleriesById: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: GALERIES_BY_ID_RESET,
});
export const resetGaleriesCurrent: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: GALERIES_CURRENT_RESET,
});
export const resetGaleriesEnd: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: GALERIES_END_RESET,
});
export const resetGaleriesFieldsError: () => Store.Action = () => ({
    payload: {},
    meta: {},
    type: GALERIES_FIELDS_ERROR_RESET,
});
export const resetGaleriesFilterName: () => Store.Action = () => ({
    payload: {},
    meta: {},
    type: GALERIES_FILTER_NAME_RESET,
});
export const resetGaleriesLoadingDelete: () => Store.Action = () => ({
    payload: {},
    meta: {},
    type: GALERIES_LOADING_DELETE_RESET,
});
export const resetGaleriesLoadingPost: () => Store.Action = () => ({
    payload: {},
    meta: {},
    type: GALERIES_LOADING_POST_RESET,
});
export const resetGaleriesLoadingPut: () => Store.Action = () => ({
    payload: {},
    meta: {},
    type: GALERIES_LOADING_PUT_RESET,
});
export const resetGaleriesPrevious: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: GALERIES_PREVIOUS_RESET,
});
export const resetGaleriesStatusId: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: GALERIES_STATUS_ID_RESET,
});
export const resetGaleriesStatusName: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: GALERIES_STATUS_NAME_RESET,
});
export const setGaleriesAllIds: (
    payload: string[],
    name: string
) => Store.Action = (payload, name) => ({
    meta: { query: { name } },
    payload,
    type: GALERIES_ALL_IDS_SET,
});
export const setGaleriesById: (payload: {
    [key: string]: Store.Models.Galerie;
}) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: GALERIES_BY_ID_SET,
});
export const updateGaleriesFieldsError: (payload: {
    description?: string;
    name?: string;
}) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: GALERIES_FIELDS_ERROR_UPDATE,
});
export const updateGaleriesCurrent: (payload: string | null) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: GALERIES_CURRENT_UPDATE,
});
export const updateGaleriesById: (
    payload: Store.Models.Galerie
) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: GALERIES_BY_UD_UPDATE,
});
export const updateGaleriesEnd: (
    payload: boolean,
    name: string
) => Store.Action = (payload, name) => ({
    meta: { query: { name } },
    payload,
    type: GALERIES_END_UPDATE,
});
export const updateGaleriesFilterName: (payload: string) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: GALERIES_FILTER_NAME_UPDATE,
});
export const updateGaleriesLoadingDelete: (
    payload: Store.Status
) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: GALERIES_LOADING_DELETE_UPDATE,
});
export const updateGaleriesLoadingPost: (
    payload: Store.Status
) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: GALERIES_LOADING_POST_UPDATE,
});
export const updateGaleriesLoadingPut: (paylaod: Store.Status) => Store.Action =
    (payload) => ({
        meta: {},
        payload,
        type: GALERIES_LOADING_PUT_UPDATE,
    });
export const updateGaleriesPrevious: (
    payload: string,
    name: string
) => Store.Action = (payload, name) => ({
    meta: { query: { name } },
    payload,
    type: GALERIES_PREVIOUS_UPDATE,
});
export const updateGaleriesStatusId: (
    payload: Store.Status,
    galerieId: string
) => Store.Action = (payload, galerieId) => ({
    meta: { query: { galerieId } },
    payload,
    type: GALERIES_STATUS_ID_UPDATE,
});
export const updateGaleriesStatusName: (
    payload: Store.Status,
    name: string
) => Store.Action = (payload, name) => ({
    meta: { query: { name } },
    payload,
    type: GALERIES_STATUS_NAME_UPDATE,
});
