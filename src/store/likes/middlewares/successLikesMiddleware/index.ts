import { Dispatch, Middleware } from 'redux';

import { ERROR_MESSAGE } from '#helpers/constants';
import { API_SUCCESS } from '#store/api/actionTypes';
import {
    dispatchErrorNotification,
    dispatchUpdateFrameLikes,
} from '#store/dispatchers';
import { updateFramesById } from '#store/frames/actionCreators';
import { getFrame, getMeId } from '#store/getters';
import { LIKES } from '#store/genericActionTypes';
import { removeLikesById, setLikesById } from '#store/likes/actionCreators';

const successDefaultMethod = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    const frameId = action.meta.query ? action.meta.query.frameId : undefined;
    if (typeof frameId === 'string') {
        const frame = getFrame(getState, frameId);
        if (frame)
            dispatchUpdateFrameLikes(dispatch, frame, {
                status: 'ERROR',
            });
    }
    dispatchErrorNotification(dispatch, ERROR_MESSAGE.METHOD_NOT_FOUND);
};
const successGetLikes = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    const frameId = action.meta.query ? action.meta.query.frameId : undefined;
    if (typeof frameId === 'string') {
        const frame = getFrame(getState, frameId);
        if (frame) {
            const allIds: string[] = [];
            const byId: { [key: string]: Store.Models.Like } = {};
            const { likes } = action.payload.data;
            if (likes && Array.isArray(likes))
                likes.forEach((l) => {
                    allIds.push(l.id);
                    byId[l.id] = l;
                });
            dispatch(setLikesById(byId));
            if (allIds.length) {
                const previousLikeId = allIds[allIds.length - 1];
                const previous = byId[previousLikeId].autoIncrementId;
                dispatchUpdateFrameLikes(dispatch, frame, {
                    allIds,
                    end: allIds.length < 20,
                    previous,
                    status: 'SUCCESS',
                });
            }
        }
    }
};
const successPostLikes = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    const frameId = action.meta.query ? action.meta.query.frameId : undefined;
    if (frameId) {
        const frame = getFrame(getState, frameId);
        if (frame) {
            const { liked, numOfLikes } = action.payload.data;
            dispatch(
                updateFramesById({
                    ...frame,
                    liked,
                    numOfLikes,
                })
            );
            if (!liked) {
                const meId = getMeId(getState);
                const likes = Object.values(getState().likes.byId).filter(
                    (like) => like.frameId === frameId && like.userId === meId
                );
                if (likes[0]) {
                    dispatch(removeLikesById(likes[0].id));
                    const allIds = frame.likes ? frame.likes.allIds : [];
                    if (allIds.length) {
                        allIds.filter((id) => id !== likes[0].id);
                        dispatchUpdateFrameLikes(dispatch, frame, {
                            allIds,
                        });
                    }
                }
            }
            // TODO: remove liked from frame where like.userId === me.id
        }
    }
};
const successLikesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${LIKES} ${API_SUCCESS}`) {
            switch (action.meta.method) {
                case 'GET':
                    successGetLikes(dispatch, getState, action);
                    break;
                case 'POST':
                    successPostLikes(dispatch, getState, action);
                    break;
                default:
                    successDefaultMethod(dispatch, getState, action);
                    break;
            }
        }
    };

export default successLikesMiddleware;
