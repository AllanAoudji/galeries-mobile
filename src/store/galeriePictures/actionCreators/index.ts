import {
    GALERIES_PICTURES_BY_ID_RESET,
    GALERIE_PICTURES_BY_ID_SET,
    GALERIE_PICTURES_GET,
    GALERIE_PICTURES_RESET,
} from '#store/galeriePictures';

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
export const resetGaleriePicturesById: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: GALERIES_PICTURES_BY_ID_RESET,
});
export const setGaleriePicturesById: (payload: {
    [key: string]: Store.Models.GaleriePicture;
}) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: GALERIE_PICTURES_BY_ID_SET,
});
