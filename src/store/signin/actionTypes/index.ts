import {
    FIELDS_ERROR,
    RESET,
    SIGNIN,
    STATUS,
    UPDATE,
} from '#store/genericActionTypes';

export const SIGNIN_FIELDS_ERROR_RESET = `${SIGNIN}${FIELDS_ERROR} ${RESET}`;
export const SIGNIN_FIELDS_ERROR_UPDATE = `${SIGNIN}${FIELDS_ERROR} ${UPDATE}`;
export const SIGNIN_RESET = `${SIGNIN} ${RESET}`;
export const SIGNIN_STATUS_RESET = `${SIGNIN}${STATUS} ${RESET}`;
export const SIGNIN_STATUS_UPDATE = `${SIGNIN}${STATUS} ${UPDATE}`;
