import { Middleware } from 'redux';

import {
    COMMENTS_RESET,
    resetCommentsById,
    resetCommentsLoadingDelete,
    resetCommentsLoadingPost,
} from '#store/comments';

const resetCommentsMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === COMMENTS_RESET) {
            dispatch(resetCommentsById());
            dispatch(resetCommentsLoadingDelete());
            dispatch(resetCommentsLoadingPost());
        }
    };

export default resetCommentsMiddleware;
