import { Middleware } from 'redux';

import { COMMENTS_DELETE } from '#store/comments/actionTypes';
import { updateCommentsLoadingDelete } from '#store/comments/actionCreators';
import { dispatchDeleteComment } from '#store/dispatchers';
import { getComment, getCommentsLoadingDelete } from '#store/getters';

const deleteCommentsMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== COMMENTS_DELETE) return;

        const loading = getCommentsLoadingDelete(getState);
        if (typeof action.payload !== 'string' || loading.includes('LOADING'))
            return;
        const comment = getComment(getState, action.payload);
        if (!comment) return;

        dispatch(updateCommentsLoadingDelete('LOADING'));
        dispatchDeleteComment(dispatch, comment.frameId, action.payload);
    };

export default deleteCommentsMiddleware;
