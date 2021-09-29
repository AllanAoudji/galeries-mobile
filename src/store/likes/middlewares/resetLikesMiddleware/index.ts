import { Middleware } from 'redux';

import { resetLikesById } from '#store/likes/actionCreators';
import { LIKES_RESET } from '#store/likes/actionTypes';

const resetLikesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === LIKES_RESET) dispatch(resetLikesById());
    };

export default resetLikesMiddleware;
