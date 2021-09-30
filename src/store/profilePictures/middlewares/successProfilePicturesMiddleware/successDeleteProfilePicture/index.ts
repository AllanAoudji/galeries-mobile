import { Dispatch } from 'redux';

import { getMe, getProfilePictures } from '#store/getters';
import {
    removeProfilePicturesAllId,
    removeProfilePicturesById,
    updateProfilePicturesLoadingDelete,
} from '#store/profilePictures/actionCreators';
import { dispatchUserCurrentProfilePicture } from '#store/dispatchers';

const successDeleteProfilePicture = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    if (
        typeof action.payload !== 'object' ||
        typeof action.payload.data !== 'object' ||
        typeof action.payload.data.profilePictureId !== 'string'
    )
        return;

    const { profilePictureId } = action.payload.data;
    dispatch(removeProfilePicturesById(profilePictureId));

    const profilePictures = getProfilePictures(getState);
    if (!profilePictures.allIds.includes(profilePictureId))
        dispatch(removeProfilePicturesAllId(profilePictureId));

    const me = getMe(getState);
    if (
        me &&
        me.currentProfilePicture &&
        me.currentProfilePicture.id === profilePictureId
    )
        dispatchUserCurrentProfilePicture(dispatch, me, {
            id: null,
        });

    dispatch(updateProfilePicturesLoadingDelete('SUCCESS'));
};

export default successDeleteProfilePicture;
