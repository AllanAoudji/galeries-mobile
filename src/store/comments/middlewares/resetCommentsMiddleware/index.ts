import { Middleware } from 'redux';

import { COMMENTS_RESET, resetCommentsById } from '#store/comments';

const resetCommentsMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === COMMENTS_RESET) dispatch(resetCommentsById());
    };

export default resetCommentsMiddleware;
