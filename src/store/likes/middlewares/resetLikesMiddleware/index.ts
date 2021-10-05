import { Middleware } from 'redux';

import {
    resetLikesAllIds,
    resetLikesById,
    resetLikesEnd,
    resetLikesPrevious,
    resetLikesStatus,
} from '#store/likes/actionCreators';
import { LIKES_RESET } from '#store/likes/actionTypes';

const resetLikesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== LIKES_RESET) return;

        dispatch(resetLikesById());
        dispatch(resetLikesAllIds());
        dispatch(resetLikesEnd());
        dispatch(resetLikesPrevious());
        dispatch(resetLikesStatus());
    };

export default resetLikesMiddleware;
