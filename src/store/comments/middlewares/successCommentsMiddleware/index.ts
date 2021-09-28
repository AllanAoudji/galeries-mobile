import { Dispatch, Middleware } from 'redux';

import { ERROR_MESSAGE } from '#helpers/constants';
import { API_SUCCESS } from '#store/api';
import { removeCommentsById, setCommentsById } from '#store/comments';
import {
    dispatchDeleteFrameComment,
    dispatchErrorNotification,
    dispatchUpdateFrameComments,
} from '#store/dispatchers';
import { COMMENTS } from '#store/genericActionTypes';
import { getComment, getFrame } from '#store/getters';
import { setLoading } from '#store/loading';

const successDefaultMethod = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    const frameId = action.meta.query ? action.meta.query.frameId : undefined;
    if (frameId) {
        const frame = getFrame(getState, frameId);
        if (frame)
            dispatchUpdateFrameComments(dispatch, frame, {
                status: 'ERROR',
            });
    }
    dispatchErrorNotification(dispatch, ERROR_MESSAGE.METHOD_NOT_FOUND);
};
const successDeleteComment = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    if (typeof action.payload.data === 'object') {
        const { commentId } = action.payload.data;
        if (typeof commentId === 'string') {
            const comment = getComment(getState, commentId);
            if (comment) {
                dispatch(removeCommentsById(commentId));
                const frame = getFrame(getState, comment.frameId);
                if (frame)
                    dispatchDeleteFrameComment(dispatch, frame, commentId);
            }
        }
    }
};
const successGetComments = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    const allIds: string[] = [];
    const byId: { [key: string]: Store.Models.Comment } = {};
    if (typeof action.payload.data === 'object') {
        const { comment, comments } = action.payload.data;
        if (comments && Array.isArray(comments))
            comments.forEach((c) => {
                allIds.push(c.id);
                byId[c.id] = c;
            });
        else if (comment && typeof comment === 'object') {
            allIds.push(comment.id);
            byId[comment.id] = comment;
        }
        if (allIds.length) {
            dispatch(setCommentsById(byId));
            const frameId = action.meta.query
                ? action.meta.query.frameId
                : undefined;
            const previousCommentId = allIds[allIds.length - 1];
            const previous = byId[previousCommentId].autoIncrementId;
            if (frameId) {
                const frame = getFrame(getState, frameId);
                if (frame)
                    dispatchUpdateFrameComments(dispatch, frame, {
                        allIds,
                        end: allIds.length < 20,
                        previous,
                        status: 'SUCCESS',
                    });
            }
        }
    }
};
const successPostComments = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    if (typeof action.payload.data === 'object') {
        const comment = action.payload.data;
        if (comment && typeof comment === 'object') {
            const frameId = action.meta.query
                ? action.meta.query.frameId
                : undefined;
            const byId = { [comment.id]: comment };
            const allIds = [comment.id];
            dispatch(setCommentsById(byId));
            if (frameId) {
                const frame = getFrame(getState, frameId);
                if (frame)
                    dispatchUpdateFrameComments(dispatch, frame, {
                        allIds,
                    });
            }
        }
    }
};
const successCommentsMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${COMMENTS} ${API_SUCCESS}`) {
            switch (action.meta.method) {
                case 'DELETE':
                    successDeleteComment(dispatch, getState, action);
                    break;
                case 'GET':
                    successGetComments(dispatch, getState, action);
                    break;
                case 'POST':
                    successPostComments(dispatch, getState, action);
                    break;
                default:
                    successDefaultMethod(dispatch, getState, action);
            }
            dispatch(setLoading(false));
        }
    };

export default successCommentsMiddleware;
