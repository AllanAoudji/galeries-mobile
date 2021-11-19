import { Dispatch } from 'redux';

import {
    removeProfilePicturesAllId,
    removeProfilePicturesById,
    resetProfilePicturesCurrent,
    removeProfilePicturesId,
    updateProfilePicturesLoadingDelete,
} from '#store/profilePictures/actionCreators';

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

    const { allIds } = getState().profilePictures;
    if (!allIds.includes(profilePictureId))
        dispatch(removeProfilePicturesAllId(profilePictureId));

    const profilePicture = getState().profilePictures.byId[profilePictureId];
    if (profilePicture) {
        dispatch(resetProfilePicturesCurrent());
        dispatch(removeProfilePicturesById(profilePictureId));
        if (getState().profilePictures.id[profilePicture.userId]) {
            dispatch(removeProfilePicturesId(profilePicture.userId));
        }
        dispatch(removeProfilePicturesAllId(profilePicture.id));
    }

    dispatch(resetProfilePicturesCurrent());
    dispatch(updateProfilePicturesLoadingDelete('SUCCESS'));
};

export default successDeleteProfilePicture;
