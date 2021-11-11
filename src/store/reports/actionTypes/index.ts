import {
    LOADING_POST,
    POST,
    REPORTS,
    RESET,
    UPDATE,
} from '#store/genericActionTypes';

export const REPORTS_LOADING_POST_RESET = `${REPORTS}${LOADING_POST} ${RESET}`;
export const REPORTS_LOADING_POST_UPDATE = `${REPORTS}${LOADING_POST} ${UPDATE}`;
export const REPORTS_POST = `${REPORTS} ${POST}`;
export const REPORTS_RESET = `${REPORTS} ${RESET}`;
