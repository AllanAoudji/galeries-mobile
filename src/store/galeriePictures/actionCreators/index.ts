import {
    GALERIE_PICTURES_ALL_ID_RESET,
    GALERIES_PICTURES_BY_ID_RESET,
    GALERIE_PICTURES_BY_ID_SET,
    GALERIE_PICTURES_GET,
    GALERIE_PICTURES_RESET,
    GALERIE_PICTURES_ALL_ID_UPDATE,
    GALERIE_PICTURES_ID_RESET,
    GALERIE_PICTURES_ID_UPDATE,
    GALERIE_PICTURES_STATUS_RESET,
    GALERIE_PICTURES_STATUS_UPDATE,
} from '#store/galeriePictures/actionTypes';

export const getFrameGaleriePictures: (frameId: string) => Store.Action = (
    frameId
) => ({
    meta: { query: { frameId } },
    payload: {},
    type: GALERIE_PICTURES_GET,
});
export const getGalerieCurrentCoverPicture: (
    galerieId: string
) => Store.Action = (galerieId) => ({
    meta: { query: { galerieId } },
    payload: {},
    type: GALERIE_PICTURES_GET,
});
export const resetGaleriePictures: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: GALERIE_PICTURES_RESET,
});
export const resetGaleriePicturesAllIds: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: GALERIE_PICTURES_ALL_ID_RESET,
});
export const resetGaleriePicturesById: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: GALERIES_PICTURES_BY_ID_RESET,
});
export const resetGaleriePicturesId: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: GALERIE_PICTURES_ID_RESET,
});
export const resetGaleriePicturesStatus: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: GALERIE_PICTURES_STATUS_RESET,
});
export const setGaleriePicturesById: (payload: {
    [key: string]: Store.Models.GaleriePicture;
}) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: GALERIE_PICTURES_BY_ID_SET,
});
export const updateGaleriePicturesAllIds: (
    frameId: string,
    payload: string[]
) => Store.Action = (frameId, payload) => ({
    meta: { query: { frameId } },
    payload,
    type: GALERIE_PICTURES_ALL_ID_UPDATE,
});
export const updateGaleriePicturesId: (
    galerieId: string,
    payload: string | null
) => Store.Action = (galerieId, payload) => ({
    meta: { query: { galerieId } },
    payload,
    type: GALERIE_PICTURES_ID_UPDATE,
});
export const updateGaleriePicturesStatus: (
    modelId: string,
    payload: Store.Status
) => Store.Action = (modelId, payload) => ({
    meta: { query: { modelId } },
    payload,
    type: GALERIE_PICTURES_STATUS_UPDATE,
});
