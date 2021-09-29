import {
    FRAMES_ALL_IDS_REMOVE,
    FRAMES_ALL_IDS_RESET,
    FRAMES_ALL_IDS_SET,
    FRAMES_BY_ID_REMOVE,
    FRAMES_BY_ID_RESET,
    FRAMES_BY_ID_SET,
    FRAMES_BY_ID_UPDATE,
    FRAMES_CURRENT_RESET,
    FRAMES_CURRENT_UPDATE,
    FRAMES_DELETE,
    FRAMES_END_RESET,
    FRAMES_END_UPDATE,
    FRAMES_FIELDS_ERROR_RESET,
    FRAMES_FIELDS_ERROR_UPDATE,
    FRAMES_GET,
    FRAMES_LOADING_DELETE_RESET,
    FRAMES_LOADING_DELETE_UPDATE,
    FRAMES_LOADING_POST_RESET,
    FRAMES_LOADING_POST_UPDATE,
    FRAMES_LOADING_PUT_RESET,
    FRAMES_LOADING_PUT_UPDATE,
    FRAMES_POST,
    FRAMES_PREVIOUS_RESET,
    FRAMES_PREVIOUS_UPDATE,
    FRAMES_PUT,
    FRAMES_RESET,
    FRAMES_STATUS_RESET,
    FRAMES_STATUS_UPDATE,
} from '#store/frames/actionTypes';

export const deleteFrame: (payload: string) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: FRAMES_DELETE,
});
export const getFrame: (payload: string) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: FRAMES_GET,
});
export const getFrames: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: FRAMES_GET,
});
export const getGalerieFrames: (galerieId: string) => Store.Action = (
    galerieId
) => ({
    meta: { query: { galerieId } },
    payload: {},
    type: FRAMES_GET,
});
export const postFrame: (galerieId: string, payload: FormData) => Store.Action =
    (galerieId, payload) => ({
        meta: { query: { galerieId } },
        payload,
        type: FRAMES_POST,
    });
export const putFrame: (
    frameId: string,
    payload: {
        description: string;
    }
) => Store.Action = (frameId, payload) => ({
    meta: { query: { frameId } },
    payload,
    type: FRAMES_PUT,
});
export const removeFramesAllIds: (payload: string) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: FRAMES_ALL_IDS_REMOVE,
});
export const removeFramesById: (payload: string) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: FRAMES_BY_ID_REMOVE,
});
export const resetFrames: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: FRAMES_RESET,
});
export const resetFramesAllIds: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: FRAMES_ALL_IDS_RESET,
});
export const resetFramesById: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: FRAMES_BY_ID_RESET,
});
export const resetFramesCurrent: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: FRAMES_CURRENT_RESET,
});
export const resetFramesEnd: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: FRAMES_END_RESET,
});
export const resetFramesFieldsError: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: FRAMES_FIELDS_ERROR_RESET,
});
export const resetFramesLoadingDelete: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: FRAMES_LOADING_DELETE_RESET,
});
export const resetFramesLoadingPost: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: FRAMES_LOADING_POST_RESET,
});
export const resetFramesLoadingPut: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: FRAMES_LOADING_PUT_RESET,
});
export const resetFramesPrevious: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: FRAMES_PREVIOUS_RESET,
});
export const resetFramesStatus: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: FRAMES_STATUS_RESET,
});
export const setFramesAllIds: (payload: string[]) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: FRAMES_ALL_IDS_SET,
});
export const setFramesById: (payload: {
    [key: string]: Store.Models.Frame;
}) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: FRAMES_BY_ID_SET,
});
export const updateFramesById: (payload: Store.Models.Frame) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: FRAMES_BY_ID_UPDATE,
});

export const updateFramesCurrent: (payload: string | null) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: FRAMES_CURRENT_UPDATE,
});
export const updateFramesEnd: (payload: boolean) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: FRAMES_END_UPDATE,
});
export const updateFramesFieldsError: (payload: {
    descritpion?: string;
}) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: FRAMES_FIELDS_ERROR_UPDATE,
});
export const updateFramesLoadingDelete: (
    payload: Store.Status
) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: FRAMES_LOADING_DELETE_UPDATE,
});
export const updateFramesLoadingPost: (payload: Store.Status) => Store.Action =
    (payload) => ({
        meta: {},
        payload,
        type: FRAMES_LOADING_POST_UPDATE,
    });
export const updateFramesLoadingPut: (payload: Store.Status) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: FRAMES_LOADING_PUT_UPDATE,
});
export const updateFramesPrevious: (payload: string) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: FRAMES_PREVIOUS_UPDATE,
});
export const updateFramesStatus: (payload: Store.Status) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: FRAMES_STATUS_UPDATE,
});
