import { Middleware } from 'redux';

import { COMMENTS_GET } from '#store/comments';
import {
    dispatchGetComment,
    dispatchGetFrameComments,
    dispatchUpdateFrameComments,
} from '#store/dispatchers';
import { getFrame } from '#store/getters';

const getCommentsMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === COMMENTS_GET) {
            const frameId = action.meta.query
                ? action.meta.query.frameId
                : undefined;
            if (typeof frameId === 'string') {
                const frame = getFrame(getState, frameId);
                if (frame) {
                    const end = frame.comments ? frame.comments.end : false;
                    const status = frame.comments
                        ? frame.comments.status
                        : 'PENDING';
                    if (!end && !status.includes('LOADING')) {
                        const previous = frame.comments
                            ? frame.comments.previous
                            : '';
                        const newStatus =
                            status === 'PENDING'
                                ? 'INITIAL_LOADING'
                                : 'LOADING';
                        dispatchUpdateFrameComments(dispatch, frame, {
                            status: newStatus,
                        });
                        dispatchGetFrameComments(
                            dispatch,
                            frameId,
                            previous || ''
                        );
                    }
                }
            } else if (typeof action.payload === 'string')
                dispatchGetComment(dispatch, action.payload);
        }
    };

export default getCommentsMiddleware;
