import { Middleware } from 'redux';

import { COMMENTS_DELETE } from '#store/comments';
import { dispatchDeleteComment } from '#store/dispatchers';
import { getComment } from '#store/getters';
import { setLoading } from '#store/loading';

const deleteCommentsMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (
            typeof action.payload === 'string' &&
            action.type === COMMENTS_DELETE
        ) {
            const comment = getComment(getState, action.payload);
            if (comment) {
                dispatch(setLoading(true));
                dispatchDeleteComment(
                    dispatch,
                    comment.frameId,
                    action.payload
                );
            }
        }
    };

export default deleteCommentsMiddleware;
