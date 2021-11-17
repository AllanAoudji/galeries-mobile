import * as FileSystem from 'expo-file-system';
import { Dispatch } from 'redux';

import { ERROR_MESSAGE } from '#helpers/constants';
import { dispatchErrorNotification } from '#store/dispatchers';
import {
    setProfilePicturesAllId,
    setProfilePicturesById,
    updateProfilePicturesEnd,
    updateProfilePicturesId,
    updateProfilePicturesPrevious,
    updateProfilePicturesStatus,
} from '#store/profilePictures/actionCreators';

const successGetProfilePictures = async (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    if (
        typeof action.payload !== 'object' ||
        typeof action.payload.data !== 'object'
    )
        return;

    const allIds: string[] = [];
    const byId: { [key: string]: Store.Models.ProfilePicture } = {};
    const { profilePicture, profilePictures } = action.payload.data;
    const userId = action.meta.query ? action.meta.query.userId : undefined;
    let id: string | undefined;

    try {
        if (profilePictures && Array.isArray(profilePictures))
            await Promise.all(
                profilePictures.map(async (pp) => {
                    const cropedImagePath = `${FileSystem.cacheDirectory}${pp.cropedImage.id}`;
                    const originalImagePath = `${FileSystem.cacheDirectory}${pp.originalImage.id}`;
                    let cropedImageCashed = '';
                    let originalImageCashed = '';

                    const cropedImage = await FileSystem.getInfoAsync(
                        cropedImagePath
                    );
                    if (cropedImage.exists) cropedImageCashed = cropedImage.uri;
                    else {
                        const newImage = await FileSystem.downloadAsync(
                            pp.cropedImage.signedUrl,
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
                            pp.originalImage.signedUrl,
                            originalImagePath
                        );
                        originalImageCashed = newImage.uri;
                    }

                    allIds.push(pp.id);
                    byId[pp.id] = {
                        ...pp,
                        cropedImage: {
                            ...pp.cropedImage,
                            cachedSignedUrl: cropedImageCashed,
                        },
                        originalImage: {
                            ...pp.originalImage,
                            cachedSignedUrl: originalImageCashed,
                        },
                    };
                })
            );
        else if (profilePicture && typeof profilePicture === 'object') {
            const cropedImagePath = `${FileSystem.cacheDirectory}${profilePicture.cropedImage.id}`;
            const originalImagePath = `${FileSystem.cacheDirectory}${profilePicture.originalImage.id}`;
            let cropedImageCashed = '';
            let originalImageCashed = '';

            const cropedImage = await FileSystem.getInfoAsync(cropedImagePath);
            if (cropedImage.exists) cropedImageCashed = cropedImage.uri;
            else {
                const newImage = await FileSystem.downloadAsync(
                    profilePicture.cropedImage.id,
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
                    profilePicture.originalImage.id,
                    originalImagePath
                );
                originalImageCashed = newImage.uri;
            }

            id = profilePicture.id;
            byId[profilePicture.id] = {
                ...profilePicture,
                cropedImage: {
                    ...profilePicture.cropedImage,
                    cachedSignedUrl: cropedImageCashed,
                },
                originalImage: {
                    ...profilePicture.originalImage,
                    cachedSignedUrl: originalImageCashed,
                },
            };
        }
    } catch (err) {
        dispatchErrorNotification(
            dispatch,
            ERROR_MESSAGE.DEFAULT_ERROR_MESSAGE
        );
        return;
    }

    dispatch(setProfilePicturesById(byId));
    const previousProfilePictureId =
        allIds.length > 0 ? allIds[allIds.length - 1] : undefined;
    const previous = previousProfilePictureId
        ? byId[previousProfilePictureId].autoIncrementId
        : undefined;

    if (id && userId) {
        dispatch(updateProfilePicturesId(userId, id));
        dispatch(updateProfilePicturesStatus(userId, 'SUCCESS'));
    } else {
        if (profilePicture === undefined) {
            dispatch(setProfilePicturesAllId(allIds));
            dispatch(updateProfilePicturesEnd(allIds.length < 20));
            dispatch(updateProfilePicturesPrevious(previous));
        }

        dispatch(updateProfilePicturesStatus('', 'SUCCESS'));
    }
};

export default successGetProfilePictures;
