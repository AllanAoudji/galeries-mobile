import { Middleware } from 'redux';

import {
    resetCommentsAllIds,
    resetCommentsById,
    resetCommentsCurrent,
    resetCommentsEnd,
    resetCommentsLoadingDelete,
    resetCommentsLoadingPost,
    resetCommentsPrevious,
    resetCommentsStatus,
} from '#store/comments/actionCreators';
import { COMMENTS_RESET } from '#store/comments/actionTypes';

const resetCommentsMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== COMMENTS_RESET) return;

        dispatch(resetCommentsAllIds());
        dispatch(resetCommentsById());
        dispatch(resetCommentsCurrent());
        dispatch(resetCommentsEnd());
        dispatch(resetCommentsLoadingDelete());
        dispatch(resetCommentsLoadingPost());
        dispatch(resetCommentsPrevious());
        dispatch(resetCommentsStatus());
    };

export default resetCommentsMiddleware;
