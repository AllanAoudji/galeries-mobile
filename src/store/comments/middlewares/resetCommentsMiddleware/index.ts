import { Middleware } from 'redux';

import {
    resetCommentsById,
    resetCommentsLoadingDelete,
    resetCommentsLoadingPost,
} from '#store/comments/actionCreators';
import { COMMENTS_RESET } from '#store/comments/actionTypes';

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
