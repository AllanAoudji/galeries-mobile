type SetGaleriePicturesParams = {
    byId?: { [key: string]: Store.Models.GaleriePicture };
};

export const GALERIE_PICTURES: Store.Entity = '[GALERIE PICTURES]';

export const GALERIE_PICTURES_FETCH = `${GALERIE_PICTURES} Fetch`;
export const GALERIE_PICTURES_SET = `${GALERIE_PICTURES} Set`;

export const fetchGaleriePictures: (meta?: {
    frameId: string;
}) => Store.Action = (meta) => ({
    payload: {
        data: {},
        meta: {
            query: {
                frameId: meta ? meta.frameId : '',
            },
        },
    },
    type: GALERIE_PICTURES_FETCH,
});
export const setGaleriePictures: (
    data: SetGaleriePicturesParams
) => Store.Action = (data) => ({
    payload: {
        data,
        meta: {},
    },
    type: GALERIE_PICTURES_SET,
});
