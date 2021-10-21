import {
    INVITATIONS_ALL_IDS_REMOVE,
    INVITATIONS_ALL_IDS_RESET,
    INVITATIONS_ALL_IDS_SET,
    INVITATIONS_BY_ID_REMOVE,
    INVITATIONS_BY_ID_RESET,
    INVITATIONS_BY_ID_SET,
    INVITATIONS_CURRENT_RESET,
    INVITATIONS_CURRENT_UPDATE,
    INVITATIONS_DELETE,
    INVITATIONS_END_RESET,
    INVITATIONS_END_UPDATE,
    INVITATIONS_GET,
    INVITATIONS_LOADING_DELETE_RESET,
    INVITATIONS_LOADING_DELETE_UPDATE,
    INVITATIONS_LOADING_POST_RESET,
    INVITATIONS_LOADING_POST_UPDATE,
    INVITATIONS_POST,
    INVITATIONS_PREVIOUS_RESET,
    INVITATIONS_PREVIOUS_UPDATE,
    INVITATIONS_RESET,
    INVITATIONS_STATUS_RESET,
    INVITATIONS_STATUS_UPDATE,
} from '#store/invitations/actionTypes';

export const deleteInvitation: (payload: string) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: INVITATIONS_DELETE,
});
export const getInvitation: (payload: string) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: INVITATIONS_GET,
});
export const getGalerieInvitations: (galerieId: string) => Store.Action = (
    galerieId
) => ({
    meta: { query: { galerieId } },
    payload: {},
    type: INVITATIONS_GET,
});
export const postInvitations: (
    galerieId: string,
    payload: { numOfInvits: number | null; time: number | null }
) => Store.Action = (galerieId, payload) => ({
    meta: { query: { galerieId } },
    payload,
    type: INVITATIONS_POST,
});
export const removeGalerieInvitationsAllIds: (
    galerieId: string,
    payload: string
) => Store.Action = (galerieId, payload) => ({
    meta: { query: { galerieId } },
    payload,
    type: INVITATIONS_ALL_IDS_REMOVE,
});
export const removeInvitationsById: (payload: string) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: INVITATIONS_BY_ID_REMOVE,
});
export const resetInvitations: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: INVITATIONS_RESET,
});
export const resetInvitationsAllIds: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: INVITATIONS_ALL_IDS_RESET,
});
export const resetInvitationsById: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: INVITATIONS_BY_ID_RESET,
});
export const resetInvitationsCurrent: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: INVITATIONS_CURRENT_RESET,
});
export const resetInvitationsEnd: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: INVITATIONS_END_RESET,
});
export const resetInvitationsLoadingDelete: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: INVITATIONS_LOADING_DELETE_RESET,
});
export const resetInvitationsLoadingPost: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: INVITATIONS_LOADING_POST_RESET,
});
export const resetInvitationsPrevious: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: INVITATIONS_PREVIOUS_RESET,
});
export const resetInvitationsStatus: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: INVITATIONS_STATUS_RESET,
});
export const setGalerieInvitationsAllIds: (
    galerieId: string,
    payload: string[]
) => Store.Action = (galerieId, payload) => ({
    meta: { query: { galerieId } },
    payload,
    type: INVITATIONS_ALL_IDS_SET,
});
export const setInvitationsById: (payload: {
    [key: string]: Store.Models.Invitation;
}) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: INVITATIONS_BY_ID_SET,
});
export const updateInvitationsCurrent: (
    payload: string | null
) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: INVITATIONS_CURRENT_UPDATE,
});
export const updategalerieInvitationsEnd: (
    galerieId: string,
    payload: boolean
) => Store.Action = (galerieId, payload) => ({
    meta: { query: { galerieId } },
    payload,
    type: INVITATIONS_END_UPDATE,
});
export const updateInvitationsLoadingDelete: (
    payload: Store.Status
) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: INVITATIONS_LOADING_DELETE_UPDATE,
});
export const updateInvitationsLoadingPost: (
    payload: Store.Status
) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: INVITATIONS_LOADING_POST_UPDATE,
});
export const updateGalerieInvitationsPrevious: (
    galerieId: string,
    payload: string
) => Store.Action = (galerieId, payload) => ({
    meta: { query: { galerieId } },
    payload,
    type: INVITATIONS_PREVIOUS_UPDATE,
});
export const updateGalerieInvitationsStatus: (
    galerieId: string,
    payload: Store.Status
) => Store.Action = (galerieId, payload) => ({
    meta: { query: { galerieId } },
    payload,
    type: INVITATIONS_STATUS_UPDATE,
});
