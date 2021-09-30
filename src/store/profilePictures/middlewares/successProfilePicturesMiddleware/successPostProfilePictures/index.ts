import * as FileSystem from 'expo-file-system';
import { Dispatch } from 'redux';

import { dispatchUserCurrentProfilePicture } from '#store/dispatchers';
import { getMe } from '#store/getters';
import {
    setProfilePicturesAllId,
    setProfilePicturesById,
    updateProfilePicturesLoadingPost,
} from '#store/profilePictures/actionCreators';

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
    const me = getMe(getState);
    if (!me) return;

    const { profilePicture } = action.payload.payload.data;
    const cropedImagePath = `${FileSystem.cacheDirectory}${profilePicture.cropedImage.id}`;
    const originalImagePath = `${FileSystem.cacheDirectory}${profilePicture.originalImage.id}`;
    let cropedImageCashed = '';
    let originalImageCashed = '';

    try {
        const cropedImage = await FileSystem.downloadAsync(
            profilePicture.cropedImage.id,
            cropedImagePath
        );
        cropedImageCashed = cropedImage.uri;
        const originalImage = await FileSystem.downloadAsync(
            profilePicture.originalImage.id,
            originalImagePath
        );
        originalImageCashed = originalImage.uri;
    } catch (err) {
        updateProfilePicturesLoadingPost('ERROR');
        return;
    }

    const allIds = [profilePicture.id];
    const byId: { [key: string]: Store.Models.ProfilePicture } = {
        [profilePicture.id]: {
            ...profilePicture,
            cropedImage: {
                ...profilePicture.cropedImage,
                cropedImageCashed,
            },
            originalImage: {
                ...profilePicture.originalImage,
                originalImageCashed,
            },
        },
    };

    dispatch(setProfilePicturesAllId(allIds));
    dispatch(setProfilePicturesById(byId));
    dispatchUserCurrentProfilePicture(dispatch, me, {
        id: profilePicture.id,
    });
    updateProfilePicturesLoadingPost('SUCCESS');
};

export default successPostProfilePictures;
