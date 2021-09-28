import {
    COMMENTS_BY_ID_REMOVE,
    COMMENTS_BY_ID_RESET,
    COMMENTS_BY_ID_SET,
    COMMENTS_DELETE,
    COMMENTS_GET,
    COMMENTS_LOADING_DELETE_RESET,
    COMMENTS_LOADING_DELETE_UPDATE,
    COMMENTS_LOADING_POST_RESET,
    COMMENTS_LOADING_POST_UPDATE,
    COMMENTS_POST,
    COMMENTS_RESET,
} from '#store/comments';

export const deleteComment: (payload: string) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: COMMENTS_DELETE,
});
export const getComment: (payload: string) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: COMMENTS_GET,
});
export const getFrameComments: (frameId: string) => Store.Action = (
    frameId
) => ({
    meta: { query: { frameId } },
    payload: {},
    type: COMMENTS_GET,
});
export const postComment: (
    payload: { body: string },
    frameId: string
) => Store.Action = (payload, frameId) => ({
    meta: { query: { frameId } },
    payload,
    type: COMMENTS_POST,
});
export const resetComments: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: COMMENTS_RESET,
});
export const resetCommentsLoadingDelete: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: COMMENTS_LOADING_DELETE_RESET,
});
export const resetCommentsLoadingPost: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: COMMENTS_LOADING_POST_RESET,
});
export const removeCommentsById: (payload: string) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: COMMENTS_BY_ID_REMOVE,
});
export const resetCommentsById: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: COMMENTS_BY_ID_RESET,
});
export const setCommentsById: (payload: {
    [key: string]: Store.Models.Comment;
}) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: COMMENTS_BY_ID_SET,
});
export const updateCommentsLoadingDelete: (
    payload: Store.Status
) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: COMMENTS_LOADING_DELETE_UPDATE,
});
export const updateCommentsLoadingPost: (
    payload: Store.Status
) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: COMMENTS_LOADING_POST_UPDATE,
});
