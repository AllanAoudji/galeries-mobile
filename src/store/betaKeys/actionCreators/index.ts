import {
    BETA_KEYS_ALL_IDS_REMOVE,
    BETA_KEYS_ALL_IDS_RESET,
    BETA_KEYS_ALL_IDS_SET,
    BETA_KEYS_BY_IDS_RESET,
    BETA_KEYS_BY_IDS_SET,
    BETA_KEYS_BY_ID_REMOVE,
    BETA_KEYS_CURRENT_RESET,
    BETA_KEYS_CURRENT_UPDATE,
    BETA_KEYS_DELETE,
    BETA_KEYS_END_RESET,
    BETA_KEYS_END_UPDATE,
    BETA_KEYS_FIELDS_ERROR_RESET,
    BETA_KEYS_FIELDS_ERROR_UPDATE,
    BETA_KEYS_GET,
    BETA_KEYS_LOADING_DELETE_RESET,
    BETA_KEYS_LOADING_DELETE_UPDATE,
    BETA_KEYS_LOADING_POST_RESET,
    BETA_KEYS_LOADING_POST_UPDATE,
    BETA_KEYS_POST,
    BETA_KEYS_PREVIOUS_RESET,
    BETA_KEYS_PREVIOUS_UPDATE,
    BETA_KEYS_REFRESH,
    BETA_KEYS_RESET,
    BETA_KEYS_SATUS_UPDATE,
    BETA_KEYS_STATUS_RESET,
} from '#store/betaKeys/actionTypes';

export const deleteBetaKey: (payload: string) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: BETA_KEYS_DELETE,
});
export const getBetaKey: (betaKeyId: string) => Store.Action = (betaKeyId) => ({
    meta: { query: { betaKeyId } },
    payload: {},
    type: BETA_KEYS_GET,
});
export const getBetaKeys: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: BETA_KEYS_GET,
});
export const postBetaKey: (payload: { email?: string }) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: BETA_KEYS_POST,
});
export const refreshBetaKeys: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: BETA_KEYS_REFRESH,
});
export const removeBetaKeysAllId: (payload: string) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: BETA_KEYS_ALL_IDS_REMOVE,
});
export const removeBetaKeysById: (payload: string) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: BETA_KEYS_BY_ID_REMOVE,
});
export const resetBetaKeys: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: BETA_KEYS_RESET,
});
export const resetBetaKeysAllIds: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: BETA_KEYS_ALL_IDS_RESET,
});
export const resetBetaKeysById: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: BETA_KEYS_BY_IDS_RESET,
});
export const resetBetaKeysCurrent: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: BETA_KEYS_CURRENT_RESET,
});
export const resetBetaKeysEnd: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: BETA_KEYS_END_RESET,
});
export const resetBetaKeysFieldsError: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: BETA_KEYS_FIELDS_ERROR_RESET,
});
export const resetBetaKeysLoadingDelete: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: BETA_KEYS_LOADING_DELETE_RESET,
});
export const resetBetaKeysLoadingPost: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: BETA_KEYS_LOADING_POST_RESET,
});
export const resetBetaKeysPrevious: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: BETA_KEYS_PREVIOUS_RESET,
});
export const resetBetaKeysStatus: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: BETA_KEYS_STATUS_RESET,
});
export const setBetaKeysAllIds: (payload: string[]) => Store.Action = () => ({
    meta: {},
    payload: {},
    type: BETA_KEYS_ALL_IDS_SET,
});
export const setBetaKeysById: (payload: {
    [key: string]: Store.Models.BetaKeys;
}) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: BETA_KEYS_BY_IDS_SET,
});
export const updateBetaKeysCurrent: (payload: string) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: BETA_KEYS_CURRENT_UPDATE,
});
export const updateBetaKeysEnd: (payload: boolean) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: BETA_KEYS_END_UPDATE,
});
export const updateBetaKeysFieldsError: (payload: {
    email?: string;
}) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: BETA_KEYS_FIELDS_ERROR_UPDATE,
});
export const updateBetaKeysLoadingDelete: (
    payload: Store.Status
) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: BETA_KEYS_LOADING_DELETE_UPDATE,
});
export const updateBetaKeysLoadingPost: (
    payload: Store.Status
) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: BETA_KEYS_LOADING_POST_UPDATE,
});
export const updateBetaKeysPrevious: (payload?: string) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: BETA_KEYS_PREVIOUS_UPDATE,
});
export const updateBetaKeysStatus: (payload: Store.Status) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: BETA_KEYS_SATUS_UPDATE,
});
