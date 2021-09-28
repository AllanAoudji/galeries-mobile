import { LOGOUT, RESET, STATUS, UPDATE } from '#store/genericActionTypes';

export const LOGOUT_STATUS_RESET = `${LOGOUT}${STATUS} ${RESET}`;
export const LOGOUT_STATUS_UPDATE = `${LOGOUT}${STATUS} ${UPDATE}`;
