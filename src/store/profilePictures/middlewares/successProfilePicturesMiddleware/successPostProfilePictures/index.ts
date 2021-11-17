import * as FileSystem from 'expo-file-system';
import { Dispatch } from 'redux';

import {
    setProfilePicturesAllId,
    setProfilePicturesById,
    updateProfilePicturesId,
    updateProfilePicturesLoadingPost,
} from '#store/profilePictures/actionCreators';
import { combineProfilePicturesAllIds } from '#store/combineAllIds';

const successPostProfilePictures = async (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    if (
        typeof action.payload !== 'object' ||
        typeof action.payload.data !== 'object' ||
        typeof action.payload.data.profilePicture !== 'object'
    )
        return;
    const meId = getState().me.id;
    if (!meId) return;

    const { profilePicture } = action.payload.data;
    const cropedImagePath = `${FileSystem.cacheDirectory}${profilePicture.cropedImage.id}`;
    const originalImagePath = `${FileSystem.cacheDirectory}${profilePicture.originalImage.id}`;
    let cropedImageCashed = '';
    let originalImageCashed = '';

    try {
        const cropedImage = await FileSystem.downloadAsync(
            profilePicture.cropedImage.signedUrl,
            cropedImagePath
        );
        cropedImageCashed = cropedImage.uri;
        const originalImage = await FileSystem.downloadAsync(
            profilePicture.originalImage.signedUrl,
            originalImagePath
        );
        originalImageCashed = originalImage.uri;
    } catch (err) {
        updateProfilePicturesLoadingPost('ERROR');
        return;
    }

    const byId: { [key: string]: Store.Models.ProfilePicture } = {
        [profilePicture.id]: {
            ...profilePicture,
            cropedImage: {
                ...profilePicture.cropedImage,
                cachedSignedUrl: cropedImageCashed,
            },
            originalImage: {
                ...profilePicture.originalImage,
                cachedSignedUrl: originalImageCashed,
            },
        },
    };
    dispatch(setProfilePicturesById(byId));

    const oldAllIds = getState().profilePictures.allIds;
    const newAllIds = combineProfilePicturesAllIds(getState, oldAllIds, [
        profilePicture.id,
    ]);
    dispatch(setProfilePicturesAllId(newAllIds));

    dispatch(updateProfilePicturesId(meId, profilePicture.id));
    dispatch(updateProfilePicturesLoadingPost('ERROR'));
};

export default successPostProfilePictures;
