import * as FileSystem from 'expo-file-system';
import { Dispatch } from 'redux';

import {
    dispatchErrorNotification,
    dispatchUpdateFrameGaleriePictures,
    dispatchUpdateGalerieCoverPicture,
} from '#store/dispatchers';
import { setGaleriePicturesById } from '#store/galeriePictures/actionCreators';
import { getFrame, getGalerie } from '#store/getters';
import { ERROR_MESSAGE } from '#helpers/constants';

const successGetGaleriePictures = async (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    if (
        typeof action.payload !== 'object' &&
        typeof action.payload.data !== 'object'
    )
        return;

    const { galeriePicture, galeriePictures } = action.payload.data;
    const allIds: string[] = [];
    const byId: {
        [key: string]: Store.Models.GaleriePicture;
    } = {};
    const frameId = action.meta.query ? action.meta.query.frameId : undefined;
    const galerieId = action.meta.query
        ? action.meta.query.galerieId
        : undefined;
    let id: string | undefined;

    try {
        if (Array.isArray(galeriePictures))
            await Promise.all(
                galeriePictures.map(async (gp) => {
                    const cropedImagePath = `${FileSystem.cacheDirectory}${gp.cropedImage.id}`;
                    const originalImagePath = `${FileSystem.cacheDirectory}${gp.originalImage.id}`;
                    let cropedImageCashed = '';
                    let originalImageCashed = '';

                    const cropedImage = await FileSystem.getInfoAsync(
                        cropedImagePath
                    );
                    if (cropedImage.exists) cropedImageCashed = cropedImage.uri;
                    else {
                        const newImage = await FileSystem.downloadAsync(
                            gp.cropedImage.signedUrl,
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
                            gp.originalImage.signedUrl,
                            originalImagePath
                        );
                        originalImageCashed = newImage.uri;
                    }

                    allIds.push(gp.id);
                    byId[gp.id] = {
                        ...gp,
                        cropedImage: {
                            ...gp.cropedImage,
                            cachedSignedUrl: cropedImageCashed,
                        },
                        originalImage: {
                            ...gp.originalImage,
                            cachedSignedUrl: originalImageCashed,
                        },
                    };
                })
            );
        else if (typeof galeriePicture === 'object') {
            const cropedImagePath = `${FileSystem.cacheDirectory}${galeriePicture.cropedImage.id}`;
            const originalImagePath = `${FileSystem.cacheDirectory}${galeriePictures.originalImage.id}`;
            let cropedImageCashed = '';
            let originalImageCashed = '';

            const cropedImage = await FileSystem.getInfoAsync(cropedImagePath);
            if (cropedImage.exists) cropedImageCashed = cropedImage.uri;
            else {
                const newImage = await FileSystem.downloadAsync(
                    galeriePicture.cropedImage.id,
                    cropedImagePath
                );
                cropedImageCashed = newImage.uri;
            }
            const originalImage = await FileSystem.getInfoAsync(
                originalImagePath
            );
            if (originalImage.exists) originalImageCashed = originalImage.uri;
            else {
                const newImage = await FileSystem.downloadAsync(
                    galeriePicture.originalImage.id,
                    originalImagePath
                );
                originalImageCashed = newImage.uri;
            }

            byId[galeriePicture.id] = {
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
            id = galeriePicture.id;
        }
    } catch (err) {
        if (frameId) {
            const frame = getFrame(getState, frameId);
            if (!frame) return;

            dispatchUpdateFrameGaleriePictures(dispatch, frame, {
                status: 'ERROR',
            });
        } else if (galerieId && typeof id === 'string') {
            const galerie = getGalerie(getState, galerieId);
            if (!galerie) return;

            dispatchUpdateGalerieCoverPicture(dispatch, galerie, {
                status: 'ERROR',
            });
        }
        dispatchErrorNotification(
            dispatch,
            ERROR_MESSAGE.DEFAULT_ERROR_MESSAGE
        );

        return;
    }

    if (!allIds.length && typeof id !== 'string') return;

    dispatch(setGaleriePicturesById(byId));

    if (allIds.length && typeof frameId === 'string') {
        const frame = getFrame(getState, frameId);
        if (!frame) return;

        dispatchUpdateFrameGaleriePictures(dispatch, frame, {
            allIds,
            status: 'SUCCESS',
        });
    } else if (typeof id === 'string' && typeof galerieId === 'string') {
        const galerie = getGalerie(getState, galerieId);
        if (!galerie) return;

        dispatchUpdateGalerieCoverPicture(dispatch, galerie, {
            id,
            status: 'SUCCESS',
        });
    }
};

export default successGetGaleriePictures;
