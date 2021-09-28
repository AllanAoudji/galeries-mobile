import { FIELDS_ERROR, LOGIN, RESET, UPDATE } from '#store/genericActionTypes';

export const LOGIN_FIELD_ERRORS_UPDATE = `${LOGIN}${FIELDS_ERROR} ${UPDATE}`;
export const LOGIN_FIELD_ERRORS_RESET = `${LOGIN}${FIELDS_ERROR} ${RESET}`;
export const LOGIN_RESET = `${LOGIN} ${RESET}`;
