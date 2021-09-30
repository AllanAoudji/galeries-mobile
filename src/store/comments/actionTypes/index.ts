import {
    BY_ID,
    COMMENTS,
    DELETE,
    GET,
    POST,
    RESET,
    REMOVE,
    SET,
    LOADING_DELETE,
    UPDATE,
    LOADING_POST,
    CURRENT,
} from '#store/genericActionTypes';

export const COMMENTS_BY_ID_REMOVE = `${COMMENTS}${BY_ID} ${REMOVE}`;
export const COMMENTS_BY_ID_RESET = `${COMMENTS}${BY_ID} ${RESET}`;
export const COMMENTS_BY_ID_SET = `${COMMENTS}${BY_ID} ${SET}`;
export const COMMENTS_BY_ID_UPDATE = `${COMMENTS}${BY_ID} ${UPDATE}`;
export const COMMENTS_CURRENT_RESET = `${COMMENTS}${CURRENT} ${RESET}`;
export const COMMENTS_CURRENT_UPDATE = `${COMMENTS}${CURRENT} ${UPDATE}`;
export const COMMENTS_DELETE = `${COMMENTS} ${DELETE}`;
export const COMMENTS_GET = `${COMMENTS} ${GET}`;
export const COMMENTS_LOADING_DELETE_RESET = `${COMMENTS}${LOADING_DELETE} ${RESET}`;
export const COMMENTS_LOADING_DELETE_UPDATE = `${COMMENTS}${LOADING_DELETE} ${UPDATE}`;
export const COMMENTS_LOADING_POST_RESET = `${COMMENTS}${LOADING_POST} ${RESET}`;
export const COMMENTS_LOADING_POST_UPDATE = `${COMMENTS}${LOADING_POST} ${UPDATE}`;
export const COMMENTS_POST = `${COMMENTS} ${POST}`;
export const COMMENTS_RESET = `${COMMENTS} ${RESET}`;
