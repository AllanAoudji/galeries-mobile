import * as FileSystem from 'expo-file-system';
import { Dispatch } from 'redux';

import {
    setFramesById,
    setGalerieFramesAllIds,
    updateFramesLoadingPost,
} from '#store/frames/actionCreators';
import { combineFramesAllIds } from '#store/combineAllIds';
import {
    setGaleriePicturesById,
    updateGaleriePicturesAllIds,
    updateGaleriePicturesStatus,
} from '#store/galeriePictures/actionCreators';

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
        [rest.id]: { ...rest },
    };

    dispatch(setFramesById(framesById));
    dispatch(setGaleriePicturesById(galeriePicturesById));
    dispatch(updateGaleriePicturesAllIds(frame.id, galeriePictureAllIds));
    dispatch(updateGaleriePicturesStatus(frame.id, 'SUCCESS'));

    const galerieId = action.meta.query
        ? action.meta.query.galerieId
        : undefined;
    if (!galerieId) {
        dispatch(updateFramesLoadingPost('ERROR'));
        return;
    }

    const oldAllIds = getState().frames.allIds[galerieId] || [];
    const newAllIds = combineFramesAllIds(getState, oldAllIds, framesAllIds);
    dispatch(setGalerieFramesAllIds(galerieId, newAllIds));

    dispatch(updateFramesLoadingPost('SUCCESS'));
};

export default successPostFrames;
