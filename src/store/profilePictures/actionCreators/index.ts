import {
    PROFILE_PICTURES_ALL_ID_REMOVE,
    PROFILE_PICTURES_ALL_ID_RESET,
    PROFILE_PICTURES_ALL_ID_SET,
    PROFILE_PICTURES_BY_ID_REMOVE,
    PROFILE_PICTURES_BY_ID_RESET,
    PROFILE_PICTURES_BY_ID_SET,
    PROFILE_PICTURES_CURRENT_RESET,
    PROFILE_PICTURES_CURRENT_UPDATE,
    PROFILE_PICTURES_DELETE,
    PROFILE_PICTURES_END_RESET,
    PROFILE_PICTURES_END_UPDATE,
    PROFILE_PICTURES_GET,
    PROFILE_PICTURES_ID_REMOVE,
    PROFILE_PICTURES_ID_RESET,
    PROFILE_PICTURES_ID_UPDATE,
    PROFILE_PICTURES_LOADING_DELETE_RESET,
    PROFILE_PICTURES_LOADING_DELETE_UPDATE,
    PROFILE_PICTURES_LOADING_POST_RESET,
    PROFILE_PICTURES_LOADING_POST_UPDATE,
    PROFILE_PICTURES_POST,
    PROFILE_PICTURES_PREVIOUS_RESET,
    PROFILE_PICTURES_PREVIOUS_UPDATE,
    PROFILE_PICTURES_RESET,
    PROFILE_PICTURES_STATUS_RESET,
    PROFILE_PICTURES_STATUS_UPDATE,
} from '#store/profilePictures/actionTypes';

export const deleteProfilePicture: (payload: string) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: PROFILE_PICTURES_DELETE,
});
export const getMeCurrentProfilePicture: () => Store.Action = () => ({
    meta: { query: { userId: 'me' } },
    payload: {},
    type: PROFILE_PICTURES_GET,
});
export const getUserCurrentProfilePicture: (userId: string) => Store.Action = (
    userId: string
) => ({
    meta: { query: { userId } },
    payload: {},
    type: PROFILE_PICTURES_GET,
});
export const getProfilePicture: (payload: string) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: PROFILE_PICTURES_GET,
});
export const getProfilePictures: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: PROFILE_PICTURES_GET,
});
export const postProfilePicture: (payload: FormData) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: PROFILE_PICTURES_POST,
});
export const removeProfilePicturesAllId: (payload: string) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: PROFILE_PICTURES_ALL_ID_REMOVE,
});
export const removeProfilePicturesById: (payload: string) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: PROFILE_PICTURES_BY_ID_REMOVE,
});
export const removeProfilePicturesId: (userId: string) => Store.Action = (
    userId
) => ({
    meta: { query: { userId } },
    payload: {},
    type: PROFILE_PICTURES_ID_REMOVE,
});
export const resetProfilePictures: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: PROFILE_PICTURES_RESET,
});
export const resetProfilePicturesAllId: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: PROFILE_PICTURES_ALL_ID_RESET,
});
export const resetProfilePicturesById: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: PROFILE_PICTURES_BY_ID_RESET,
});
export const resetProfilePicturesCurrent: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: PROFILE_PICTURES_CURRENT_RESET,
});
export const resetProfilePicturesEnd: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: PROFILE_PICTURES_END_RESET,
});
export const resetProfilePicturesId: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: PROFILE_PICTURES_ID_RESET,
});
export const resetProfilePicturesLoadingDelete: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: PROFILE_PICTURES_LOADING_DELETE_RESET,
});
export const resetProfilePicturesLoadingPost: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: PROFILE_PICTURES_LOADING_POST_RESET,
});
export const resetProfilePicturesPrevious: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: PROFILE_PICTURES_PREVIOUS_RESET,
});
export const resetProfilePicturesStatus: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: PROFILE_PICTURES_STATUS_RESET,
});
export const setProfilePicturesAllId: (payload: string[]) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: PROFILE_PICTURES_ALL_ID_SET,
});
export const setProfilePicturesById: (payload: {
    [key: string]: Store.Models.ProfilePicture;
}) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: PROFILE_PICTURES_BY_ID_SET,
});
export const updateProfilePicturesCurrent: (
    payload: string | null
) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: PROFILE_PICTURES_CURRENT_UPDATE,
});
export const updateProfilePicturesEnd: (payload: boolean) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: PROFILE_PICTURES_END_UPDATE,
});
export const updateProfilePicturesId: (
    userId: string,
    payload: string
) => Store.Action = (userId, payload) => ({
    meta: { query: { userId } },
    payload,
    type: PROFILE_PICTURES_ID_UPDATE,
});
export const updateProfilePicturesLoadingDelete: (
    payload: Store.Status
) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: PROFILE_PICTURES_LOADING_DELETE_UPDATE,
});
export const updateProfilePicturesLoadingPost: (
    payload: Store.Status
) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: PROFILE_PICTURES_LOADING_POST_UPDATE,
});
export const updateProfilePicturesPrevious: (payload: string) => Store.Action =
    (payload) => ({
        meta: {},
        payload,
        type: PROFILE_PICTURES_PREVIOUS_UPDATE,
    });
export const updateProfilePicturesStatus: (
    userId: string,
    payload: Store.Status
) => Store.Action = (userId, payload) => ({
    meta: { query: { userId } },
    payload,
    type: PROFILE_PICTURES_STATUS_UPDATE,
});
