import { Middleware } from 'redux';

import { LIKES_RESET, resetLikesById } from '#store/likes';

const resetLikesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === LIKES_RESET) dispatch(resetLikesById());
    };

export default resetLikesMiddleware;
