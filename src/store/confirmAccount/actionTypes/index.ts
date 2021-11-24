import {
    CONFIRM_ACCOUNT,
    POST,
    RESET,
    STATUS,
    UPDATE,
} from '#store/genericActionTypes';

export const CONFIRM_ACCOUNT_POST = `${CONFIRM_ACCOUNT} ${POST}`;
export const CONFIRM_ACCOUNT_RESET = `${CONFIRM_ACCOUNT} ${RESET}`;
export const CONFIRM_ACCOUNT_STATUS_RESET = `${CONFIRM_ACCOUNT}${STATUS} ${RESET}`;
export const CONFIRM_ACCOUNT_STATUS_UPDATE = `${CONFIRM_ACCOUNT}${STATUS} ${UPDATE}`;