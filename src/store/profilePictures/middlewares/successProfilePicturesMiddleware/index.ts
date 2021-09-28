import { Dispatch, Middleware } from 'redux';

import { ERROR_MESSAGE } from '#helpers/constants';
import { API_SUCCESS } from '#store/api';
import {
    dispatchErrorNotification,
    dispatchUserCurrentProfilePicture,
} from '#store/dispatchers';
import { PROFILE_PICTURES } from '#store/genericActionTypes';
import { getMe, getProfilePictures, getUser } from '#store/getters';
import {
    removeProfilePicturesAllId,
    removeProfilePicturesById,
    setProfilePicturesAllId,
    setProfilePicturesById,
    updateProfilePicturesEnd,
    updateProfilePicturesLoadingDelete,
    updateProfilePicturesLoadingPost,
    updateProfilePicturesPrevious,
    updateProfilePicturesStatus,
} from '#store/profilePictures/actionCreators';

const successDefaultMethod = (dispatch: Dispatch<Store.Action>) =>
    dispatchErrorNotification(dispatch, ERROR_MESSAGE.METHOD_NOT_FOUND);

const successDeleteProfilePicture = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    const { profilePictureId } = action.payload.data;
    dispatch(removeProfilePicturesById(profilePictureId));
    if (typeof profilePictureId === 'string') {
        const profilePictures = getProfilePictures(getState);
        if (profilePictures.allIds.includes(profilePictureId))
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
    }
};
const successGetProfilePictures = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    const allIds: string[] = [];
    const byId: { [key: string]: Store.Models.ProfilePicture } = {};
    let id: string | undefined;
    const { profilePicture, profilePictures } = action.payload.data;
    if (profilePictures && Array.isArray(profilePictures))
        profilePictures.forEach((pp: Store.Models.ProfilePicture) => {
            allIds.push(pp.id);
            byId[pp.id] = pp;
        });
    else if (profilePicture && typeof profilePicture === 'object') {
        id = profilePicture.id;
        byId[profilePicture.id] = profilePicture;
    }
    dispatch(setProfilePicturesById(byId));
    if (allIds.length) {
        const previousProfilePictureId = allIds[allIds.length - 1];
        const previous = byId[previousProfilePictureId].autoIncrementId;
        dispatch(setProfilePicturesAllId(allIds));
        dispatch(updateProfilePicturesEnd(allIds.length < 20));
        dispatch(updateProfilePicturesPrevious(previous));
        dispatch(updateProfilePicturesStatus('SUCCESS'));
    } else if (id) {
        const userId = action.meta.query ? action.meta.query.userId : undefined;
        if (userId) {
            const user = getUser(getState, userId);
            if (user)
                dispatchUserCurrentProfilePicture(dispatch, user, {
                    id,
                    status: 'SUCCESS',
                });
        }
    }
};
const successPostProfilePictures = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    const { profilePicture } = action.payload.payload.data;
    const me = getMe(getState);
    if (me && typeof profilePicture === 'object') {
        const allIds = [profilePicture.id];
        const byId = { [profilePicture.id]: profilePicture };
        dispatch(setProfilePicturesAllId(allIds));
        dispatch(setProfilePicturesById(byId));
        dispatchUserCurrentProfilePicture(dispatch, me, {
            id: profilePicture.id,
        });
        updateProfilePicturesLoadingPost('SUCCESS');
    }
};
const successProfilePicturesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${PROFILE_PICTURES} ${API_SUCCESS}`) {
            switch (action.meta.method) {
                case 'DELETE':
                    successDeleteProfilePicture(dispatch, getState, action);
                    break;
                case 'GET':
                    successGetProfilePictures(dispatch, getState, action);
                    break;
                case 'POST':
                    successPostProfilePictures(dispatch, getState, action);
                    break;
                default:
                    successDefaultMethod(dispatch);
                    break;
            }
        }
    };

export default successProfilePicturesMiddleware;
