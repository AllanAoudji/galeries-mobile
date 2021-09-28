import {
    BY_ID,
    COMMENTS,
    DELETE,
    GET,
    POST,
    RESET,
    REMOVE,
    SET,
} from '#store/genericActionTypes';

export const COMMENTS_BY_ID_REMOVE = `${COMMENTS}${BY_ID} ${REMOVE}`;
export const COMMENTS_BY_ID_RESET = `${COMMENTS}${BY_ID} ${RESET}`;
export const COMMENTS_BY_ID_SET = `${COMMENTS}${BY_ID} ${SET}`;
export const COMMENTS_DELETE = `${COMMENTS} ${DELETE}`;
export const COMMENTS_GET = `${COMMENTS} ${GET}`;
export const COMMENTS_POST = `${COMMENTS} ${POST}`;
export const COMMENTS_RESET = `${COMMENTS} ${RESET}`;
