import { Dispatch } from 'redux';
import {
    removeProfilePicturesId,
    updateProfilePicturesId,
    updateProfilePicturesLoadingPut,
} from '#store/profilePictures/actionCreators';

const successPutMethod = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    if (
        typeof action.payload !== 'object' &&
        typeof action.payload.data !== 'object'
    )
        return;
    const { current, profilePictureId } = action.payload.data;
    if (typeof profilePictureId !== 'string' || typeof current !== 'boolean')
        return;
    const profilePicture = getState().profilePictures.byId[profilePictureId];
    const meId = getState().me.id;

    if (profilePicture && meId) {
        if (current) dispatch(updateProfilePicturesId(meId, profilePictureId));
        else dispatch(removeProfilePicturesId(meId));
        dispatch(updateProfilePicturesLoadingPut('SUCCESS'));
    } else dispatch(updateProfilePicturesLoadingPut('ERROR'));
};

export default successPutMethod;
