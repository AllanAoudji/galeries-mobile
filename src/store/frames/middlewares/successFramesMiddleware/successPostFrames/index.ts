import * as FileSystem from 'expo-file-system';
import { Dispatch } from 'redux';

import { dispatchUpdateGalerieFrames } from '#store/dispatchers';
import {
    setFramesById,
    updateFramesLoadingPost,
} from '#store/frames/actionCreators';
import { getGalerie, getGalerieFramesAllIds } from '#store/getters';
import { combineFramesAllIds } from '#store/combineFrames';
import { setGaleriePicturesById } from '#store/galeriePictures';

const successPostFrames = async (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    if (typeof action.payload.data !== 'object') return;
    const { frame } = action.payload.data;
    if (!frame || typeof frame !== 'object') return;
    const { galeriePictures, ...rest } = frame;
    if (!galeriePictures || !Array.isArray(galeriePictures)) return;

    const galeriePictureAllIds: string[] = [];
    const galeriePicturesById: {
        [key: string]: Store.Models.GaleriePicture;
    } = {};

    try {
        await Promise.all(
            galeriePictures.map(async (galeriePicture) => {
                const cropedImagePath = `${FileSystem.cacheDirectory}${galeriePicture.cropedImage.id}`;
                const originalImagePath = `${FileSystem.cacheDirectory}${galeriePicture.originalImage.id}`;
                let cropedImageCashed = '';
                let originalImageCashed = '';
                const cropedImage = await FileSystem.getInfoAsync(
                    cropedImagePath
                );
                if (cropedImage.exists) cropedImageCashed = cropedImage.uri;
                else {
                    const newImage = await FileSystem.downloadAsync(
                        galeriePicture.cropedImage.signedUrl,
                        cropedImagePath
                    );
                    cropedImageCashed = newImage.uri;
                }
                const originalImage = await FileSystem.getInfoAsync(
                    originalImagePath
                );
                if (originalImage.exists)
                    originalImageCashed = originalImage.uri;
                else {
                    const newImage = await FileSystem.downloadAsync(
                        galeriePicture.originalImage.signedUrl,
                        originalImagePath
                    );
                    originalImageCashed = newImage.uri;
                }

                galeriePictureAllIds.push(galeriePicture.id);
                galeriePicturesById[galeriePicture.id] = {
                    ...galeriePicture,
                    cropedImage: {
                        ...galeriePicture.cropedImage,
                        cachedSignedUrl: cropedImageCashed,
                    },
                    originalImage: {
                        ...galeriePicture.originalImage,
                        cachedSignedUrl: originalImageCashed,
                    },
                };
            })
        );
    } catch (err) {
        dispatch(updateFramesLoadingPost('ERROR'));
        return;
    }

    const framesAllIds: string[] = [rest.id];
    const framesById: { [key: string]: Store.Models.Frame } = {
        [rest.id]: {
            ...rest,
            galeriePictures: {
                allIds: galeriePictureAllIds,
                status: 'SUCCESS',
            },
        },
    };

    const galerieId = action.meta.query
        ? action.meta.query.galerieid
        : undefined;

    dispatch(setFramesById(framesById));
    dispatch(setGaleriePicturesById(galeriePicturesById));

    if (!galerieId) return;

    const galerie = getGalerie(getState, galerieId);
    if (galerie) {
        const oldAllIds = getGalerieFramesAllIds(getState, galerieId) || [];
        const newAllIds = combineFramesAllIds(
            getState,
            oldAllIds,
            framesAllIds
        );
        dispatchUpdateGalerieFrames(dispatch, getState, galerie, {
            allIds: newAllIds,
        });
    }

    dispatch(updateFramesLoadingPost('SUCCESS'));
};

export default successPostFrames;
