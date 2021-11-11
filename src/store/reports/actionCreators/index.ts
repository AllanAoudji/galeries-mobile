import {
    REPORTS_LOADING_POST_RESET,
    REPORTS_LOADING_POST_UPDATE,
    REPORTS_POST,
    REPORTS_RESET,
} from '#store/reports/actionTypes';

export const postReports: (
    modelId: string,
    payload: {
        reason:
            | 'disinformation'
            | 'harassment'
            | 'hate'
            | 'intellectual property'
            | 'nudity'
            | 'scam';
    },
    type: 'frameId' | 'commentId' | 'profilePictureId'
) => Store.Action = (modelId, payload, type) => ({
    meta: { query: { [type]: modelId } },
    payload,
    type: REPORTS_POST,
});
export const resetReports: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: REPORTS_RESET,
});
export const resetReportsLoadingPost: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: REPORTS_LOADING_POST_RESET,
});

export const updateReportsLoadingPost: (payload: Store.Status) => Store.Action =
    (payload) => ({
        meta: {},
        payload,
        type: REPORTS_LOADING_POST_UPDATE,
    });
