import {
    GALERIE_BLACKLISTS_ALL_IDS_REMOVE,
    GALERIE_BLACKLISTS_ALL_IDS_RESET,
    GALERIE_BLACKLISTS_ALL_IDS_SET,
    GALERIE_BLACKLISTS_BY_ID_REMOVE,
    GALERIE_BLACKLISTS_BY_ID_SET,
    GALERIE_BLACKLISTS_BY_ID_UPDATE,
    GALERIE_BLACKLISTS_CURRENT_RESET,
    GALERIE_BLACKLISTS_CURRENT_UPDATE,
    GALERIE_BLACKLISTS_DELETE,
    GALERIE_BLACKLISTS_END_RESET,
    GALERIE_BLACKLISTS_END_UPDATE,
    GALERIE_BLACKLISTS_GET,
    GALERIE_BLACKLISTS_LOADING_DELETE_RESET,
    GALERIE_BLACKLISTS_LOADING_DELETE_UPDATE,
    GALERIE_BLACKLISTS_LOADING_POST_RESET,
    GALERIE_BLACKLISTS_LOADING_POST_UPDATE,
    GALERIE_BLACKLISTS_POST,
    GALERIE_BLACKLISTS_PREVIOUS_RESET,
    GALERIE_BLACKLISTS_PREVIOUS_UPDATE,
    GALERIE_BLACKLISTS_RESET,
    GALERIE_BLACKLISTS_STATUS_UPDATE,
} from '#store/galerieBlackLists/actionTypes';

export const deleteGalerieBlackList: (
    galerieId: string,
    galerieBlackListId: string
) => Store.Action = (galerieId, galerieBlackListId) => ({
    meta: { query: { galerieId, galerieBlackListId } },
    payload: {},
    type: GALERIE_BLACKLISTS_DELETE,
});
export const getGalerieBlackList: (
    galerieId: string,
    galerieBlackListId: string
) => Store.Action = (galerieId, galerieBlackListId) => ({
    meta: { query: { galerieId, galerieBlackListId } },
    payload: {},
    type: GALERIE_BLACKLISTS_GET,
});
export const getGalerieBlackLists: (galerieId: string) => Store.Action = (
    galerieId
) => ({
    meta: { query: { galerieId } },
    payload: {},
    type: GALERIE_BLACKLISTS_GET,
});
export const postGalerieBlackList: (
    galerieId: string,
    userId: string
) => Store.Action = (galerieId, userId) => ({
    meta: { query: { galerieId, userId } },
    payload: {},
    type: GALERIE_BLACKLISTS_POST,
});
export const removeGalerieBlackListsAllIds: (
    galerieId: string,
    galerieBlackListId: string
) => Store.Action = (galerieId, galerieBlackListId) => ({
    meta: { query: { galerieId } },
    payload: galerieBlackListId,
    type: GALERIE_BLACKLISTS_ALL_IDS_REMOVE,
});
export const removeGalerieBlackListsById: (
    galerieBlackListId: string
) => Store.Action = (galerieBlackListsId) => ({
    meta: {},
    payload: galerieBlackListsId,
    type: GALERIE_BLACKLISTS_BY_ID_REMOVE,
});
export const resetGalerieBlackLists: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: GALERIE_BLACKLISTS_RESET,
});
export const resetGalerieBlackListsAllIds: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: GALERIE_BLACKLISTS_ALL_IDS_RESET,
});
export const resetGalerieBlackListsCurrent: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: GALERIE_BLACKLISTS_CURRENT_RESET,
});
export const resetGalerieBlackListsEnd: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: GALERIE_BLACKLISTS_END_RESET,
});
export const resetGalerieBlackListsLoadingDelete: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: GALERIE_BLACKLISTS_LOADING_DELETE_RESET,
});
export const resetGalerieBlackListsLoadingPost: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: GALERIE_BLACKLISTS_LOADING_POST_RESET,
});
export const resetGalerieBlackListsPrevious: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: GALERIE_BLACKLISTS_PREVIOUS_RESET,
});
export const setGalerieBlackListsAllIds: (
    galerieId: string,
    payload: string[]
) => Store.Action = (galerieId, payload) => ({
    meta: { query: { galerieId } },
    payload,
    type: GALERIE_BLACKLISTS_ALL_IDS_SET,
});
export const setGalerieBlackListsById: (payload: {
    [key: string]: Store.Models.GalerieBlackList;
}) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: GALERIE_BLACKLISTS_BY_ID_SET,
});
export const updateGalerieBlackListsById: (
    payload: Store.Models.GalerieBlackList
) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: GALERIE_BLACKLISTS_BY_ID_UPDATE,
});
export const updateGalerieBlackListsCurrent: (
    payload: string | null
) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: GALERIE_BLACKLISTS_CURRENT_UPDATE,
});
export const updateGalerieBlackLitstsEnd: (
    galerieId: string,
    payload: boolean
) => Store.Action = (galerieId, payload) => ({
    meta: { query: { galerieId } },
    payload,
    type: GALERIE_BLACKLISTS_END_UPDATE,
});
export const updateGalerieBlackListsLoadingDelete: (
    payload: Store.Status
) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: GALERIE_BLACKLISTS_LOADING_DELETE_UPDATE,
});
export const updateGalerieBlackListsLoadingPost: (
    payload: Store.Status
) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: GALERIE_BLACKLISTS_LOADING_POST_UPDATE,
});
export const updateGalerieBlackListsPrevious: (
    galerieId: string,
    payload: string
) => Store.Action = (galerieId, payload) => ({
    meta: { query: { galerieId } },
    payload,
    type: GALERIE_BLACKLISTS_PREVIOUS_UPDATE,
});
export const updateGalerieBlackListsStatus: (
    galerieId: string,
    payload: Store.Status
) => Store.Action = (galerieId, payload) => ({
    meta: { query: { galerieId } },
    payload,
    type: GALERIE_BLACKLISTS_STATUS_UPDATE,
});
