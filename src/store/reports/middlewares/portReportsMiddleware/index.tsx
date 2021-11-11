import { Middleware } from 'redux';

import { REPORTS_POST } from '#store/reports/actionTypes';
import { updateReportsLoadingPost } from '#store/reports/actionCreators';
import {
    dispatchPostCommentIdReports,
    dispatchPostFrameIdReports,
    dispatchPostProfilePictureIdReports,
} from '#store/dispatchers';

const postReportsMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== REPORTS_POST) return;
        if (!action.meta.query) return;
        if (typeof action.payload !== 'object') return;
        if (typeof action.payload.reason !== 'string') return;

        const loading = getState().reports.loading.post;
        if (loading.includes('LOADING')) return;

        if (action.meta.query.commentId) {
            dispatch(updateReportsLoadingPost('LOADING'));
            dispatchPostCommentIdReports(
                dispatch,
                action.meta.query.commentId,
                action.payload
            );
        } else if (action.meta.query.frameId) {
            dispatch(updateReportsLoadingPost('LOADING'));
            dispatchPostFrameIdReports(
                dispatch,
                action.meta.query.frameId,
                action.payload
            );
        } else if (action.meta.query.profilePictureId) {
            dispatch(updateReportsLoadingPost('LOADING'));
            dispatchPostProfilePictureIdReports(
                dispatch,
                action.meta.query.profilePictureId,
                action.payload
            );
        }
    };

export default postReportsMiddleware;
