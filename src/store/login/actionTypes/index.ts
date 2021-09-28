import {
    FIELDS_ERROR,
    LOGIN,
    RESET,
    STATUS,
    UPDATE,
} from '#store/genericActionTypes';

export const LOGIN_FIELD_ERRORS_UPDATE = `${LOGIN}${FIELDS_ERROR} ${UPDATE}`;
export const LOGIN_FIELD_ERRORS_RESET = `${LOGIN}${FIELDS_ERROR} ${RESET}`;
export const LOGIN_RESET = `${LOGIN} ${RESET}`;
export const LOGIN_STATUS_RESET = `${LOGIN}${STATUS} ${RESET}`;
export const LOGIN_STATUS_UPDATE = `${LOGIN}${STATUS} ${UPDATE}`;
