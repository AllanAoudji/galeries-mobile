import {
    SEND_BETA_KEY_POST,
    SEND_BETA_KEY_RESET,
    SEND_BETA_KEY_STATUS_ID_RESET,
    SEND_BETA_KEY_STATUS_ID_UPDATE,
} from '#store/sendBetaKey/actionTypes';

export const sendBetaKey: (betaKeyId: string) => Store.Action = (
    betaKeyId
) => ({
    meta: { query: { betaKeyId } },
    payload: {},
    type: SEND_BETA_KEY_POST,
});
export const resetSendBetaKey: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: SEND_BETA_KEY_RESET,
});
export const resetSendBetaKeyStatusId: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: SEND_BETA_KEY_STATUS_ID_RESET,
});
export const updateSendBetaKeyStatusId: (
    payload: Store.Status,
    betaKeyId: string
) => Store.Action = (payload, betaKeyId) => ({
    meta: { query: { betaKeyId } },
    payload,
    type: SEND_BETA_KEY_STATUS_ID_UPDATE,
});
