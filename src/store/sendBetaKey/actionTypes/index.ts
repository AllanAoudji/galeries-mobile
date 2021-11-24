import {
    POST,
    RESET,
    SEND_BETA_KEY,
    STATUS_ID,
    UPDATE,
} from '#store/genericActionTypes';

export const SEND_BETA_KEY_POST = `${SEND_BETA_KEY} ${POST}`;
export const SEND_BETA_KEY_RESET = `${SEND_BETA_KEY} ${RESET}`;
export const SEND_BETA_KEY_STATUS_ID_RESET = `${SEND_BETA_KEY}${STATUS_ID} ${RESET}`;
export const SEND_BETA_KEY_STATUS_ID_UPDATE = `${SEND_BETA_KEY}${STATUS_ID} ${UPDATE}`;
