type SetGaleriePicturesParams = {
    byId?: { [key: string]: Store.Models.GaleriePicture };
};

export const GALERIE_PICTURES: Store.Entity = '[GALERIE PICTURES]';

export const GALERIE_PICTURES_SET = `${GALERIE_PICTURES} Set`;

export const setGaleriePictures: (
    data: SetGaleriePicturesParams
) => Store.Action = (data) => ({
    payload: {
        data,
        meta: {},
    },
    type: GALERIE_PICTURES_SET,
});
