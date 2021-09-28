import {
    LIKES_BY_ID_REMOVE,
    LIKES_BY_ID_RESET,
    LIKES_BY_ID_SET,
    LIKES_GET,
    LIKES_POST,
    LIKES_RESET,
} from '#store/likes';

export const getLike: (payload: string) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: LIKES_GET,
});
export const geFrameLikes: (frameId: string) => Store.Action = (frameId) => ({
    meta: { query: { frameId } },
    payload: {},
    type: LIKES_GET,
});
export const postLike: (frameId: string) => Store.Action = (frameId) => ({
    meta: { query: { frameId } },
    payload: {},
    type: LIKES_POST,
});
export const removeLikesById: (payload: string) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: LIKES_BY_ID_REMOVE,
});
export const resetLikes: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: LIKES_RESET,
});
export const resetLikesById: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: LIKES_BY_ID_RESET,
});
export const setLikesById: (payload: {
    [key: string]: Store.Models.Like;
}) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: LIKES_BY_ID_SET,
});
