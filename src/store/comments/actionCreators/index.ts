import {
    COMMENTS_ALL_IDS_RESET,
    COMMENTS_ALL_IDS_UPDATE,
    COMMENTS_BY_ID_REMOVE,
    COMMENTS_BY_ID_RESET,
    COMMENTS_BY_ID_SET,
    COMMENTS_BY_ID_UPDATE,
    COMMENTS_CURRENT_RESET,
    COMMENTS_CURRENT_UPDATE,
    COMMENTS_DELETE,
    COMMENTS_END_RESET,
    COMMENTS_END_UPDATE,
    COMMENTS_GET,
    COMMENTS_LOADING_DELETE_RESET,
    COMMENTS_LOADING_DELETE_UPDATE,
    COMMENTS_LOADING_POST_RESET,
    COMMENTS_LOADING_POST_UPDATE,
    COMMENTS_POST,
    COMMENTS_PREVIOUS_RESET,
    COMMENTS_PREVIOUS_UPDATE,
    COMMENTS_REFRESH,
    COMMENTS_RESET,
    COMMENTS_STATUS_RESET,
    COMMENTS_STATUS_UPDATE,
} from '#store/comments/actionTypes';

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
export const getCommentComments: (commentId: string) => Store.Action = (
    commentId
) => ({
    meta: { query: { commentId } },
    payload: {},
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
export const postCommentComment: (
    payload: { body: string },
    commentId: string
) => Store.Action = (payload, commentId) => ({
    meta: { query: { commentId } },
    payload,
    type: COMMENTS_POST,
});
export const refreshFrameComments: (frameId: string) => Store.Action = (
    frameId
) => ({
    meta: { query: { frameId } },
    payload: {},
    type: COMMENTS_REFRESH,
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
export const resetCommentsPrevious: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: COMMENTS_PREVIOUS_RESET,
});
export const resetCommentsStatus: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: COMMENTS_STATUS_RESET,
});
export const removeCommentsById: (payload: string) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: COMMENTS_BY_ID_REMOVE,
});
export const resetCommentsAllIds: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: COMMENTS_ALL_IDS_RESET,
});
export const resetCommentsById: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: COMMENTS_BY_ID_RESET,
});
export const resetCommentsCurrent: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: COMMENTS_CURRENT_RESET,
});
export const resetCommentsEnd: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: COMMENTS_END_RESET,
});
export const setCommentsById: (payload: {
    [key: string]: Store.Models.Comment;
}) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: COMMENTS_BY_ID_SET,
});
export const updateCommentsAllIds: (
    modelId: string,
    payload: string[]
) => Store.Action = (modelId, payload) => ({
    meta: { query: { modelId } },
    payload,
    type: COMMENTS_ALL_IDS_UPDATE,
});
export const updateCommentsById: (
    payload: Store.Models.Comment
) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: COMMENTS_BY_ID_UPDATE,
});
export const updateCommentsCurrent: (payload: string) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: COMMENTS_CURRENT_UPDATE,
});
export const updateCommentsEnd: (
    modelId: string,
    payload: boolean
) => Store.Action = (modelId, payload) => ({
    meta: { query: { modelId } },
    payload,
    type: COMMENTS_END_UPDATE,
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
export const updateCommentsPrevious: (
    modelId: string,
    payload: string
) => Store.Action = (modelId, payload) => ({
    meta: { query: { modelId } },
    payload,
    type: COMMENTS_PREVIOUS_UPDATE,
});
export const updateCommentsStatus: (
    modelId: string,
    payload: Store.Status
) => Store.Action = (modelId, payload) => ({
    meta: { query: { modelId } },
    payload,
    type: COMMENTS_STATUS_UPDATE,
});
