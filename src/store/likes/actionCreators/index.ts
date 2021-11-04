import {
    LIKES_ALL_IDS_RESET,
    LIKES_ALL_IDS_SET,
    LIKES_BY_ID_REMOVE,
    LIKES_BY_ID_RESET,
    LIKES_BY_ID_SET,
    LIKES_END_RESET,
    LIKES_END_SET,
    LIKES_GET,
    LIKES_POST,
    LIKES_PREVIOUS_RESET,
    LIKES_PREVIOUS_SET,
    LIKES_REFRESH,
    LIKES_RESET,
    LIKES_STATUS_RESET,
    LIKES_STATUS_SET,
} from '#store/likes/actionTypes';

export const getLike: (payload: string) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: LIKES_GET,
});
export const getFrameLikes: (frameId: string) => Store.Action = (frameId) => ({
    meta: { query: { frameId } },
    payload: {},
    type: LIKES_GET,
});
export const postLike: (frameId: string) => Store.Action = (frameId) => ({
    meta: { query: { frameId } },
    payload: {},
    type: LIKES_POST,
});
export const refreshFrameLikes: (frameId: string) => Store.Action = (
    frameId
) => ({
    meta: { query: { frameId } },
    payload: {},
    type: LIKES_REFRESH,
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
export const resetLikesAllIds: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: LIKES_ALL_IDS_RESET,
});
export const resetLikesById: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: LIKES_BY_ID_RESET,
});
export const resetLikesEnd: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: LIKES_END_RESET,
});
export const resetLikesPrevious: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: LIKES_PREVIOUS_RESET,
});
export const resetLikesStatus: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: LIKES_STATUS_RESET,
});
export const setLikesAllIds: (
    frameId: string,
    payload: string[]
) => Store.Action = (frameId, payload) => ({
    meta: { query: { frameId } },
    payload,
    type: LIKES_ALL_IDS_SET,
});
export const setLikesById: (payload: {
    [key: string]: Store.Models.Like;
}) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: LIKES_BY_ID_SET,
});
export const setLikesEnd: (frameId: string, payload: boolean) => Store.Action =
    (frameId, payload) => ({
        meta: { query: { frameId } },
        payload,
        type: LIKES_END_SET,
    });
export const setLikesPrevious: (
    frameId: string,
    payload: string
) => Store.Action = (frameId, payload) => ({
    meta: { query: { frameId } },
    payload,
    type: LIKES_PREVIOUS_SET,
});
export const setLikesStatus: (
    frameId: string,
    payload: Store.Status
) => Store.Action = (frameId, payload) => ({
    meta: { query: { frameId } },
    payload,
    type: LIKES_STATUS_SET,
});
