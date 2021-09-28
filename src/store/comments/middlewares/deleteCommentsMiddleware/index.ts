import { Middleware } from 'redux';

import { COMMENTS_DELETE, updateCommentsLoadingDelete } from '#store/comments';
import { dispatchDeleteComment } from '#store/dispatchers';
import { getComment, getCommentsLoadingDelete } from '#store/getters';

const deleteCommentsMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === COMMENTS_DELETE) {
            const loading = getCommentsLoadingDelete(getState);
            if (
                typeof action.payload === 'string' &&
                !loading.includes('LOADING')
            ) {
                const comment = getComment(getState, action.payload);
                if (comment) {
                    dispatch(updateCommentsLoadingDelete('LOADING'));
                    dispatchDeleteComment(
                        dispatch,
                        comment.frameId,
                        action.payload
                    );
                }
            }
        }
    };

export default deleteCommentsMiddleware;
