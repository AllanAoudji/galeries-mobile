import { Dispatch } from 'redux';
import { updateReportsLoadingPost } from '#store/reports/actionCreators';
import { removeCommentsById, updateCommentsAllIds } from '#store/comments';
import {
    removeFramesById,
    setFramesAllIds,
    setGalerieFramesAllIds,
} from '#store/frames';
import {
    removeProfilePicturesById,
    removeProfilePicturesId,
} from '#store/profilePictures';

const successPostMethod = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    if (!action.meta.query) {
        dispatch(updateReportsLoadingPost('ERROR'));
        return;
    }
    const { commentId, frameId, profilePictureId } = action.meta.query;
    if (!commentId && !frameId && !profilePictureId) {
        dispatch(updateReportsLoadingPost('ERROR'));
        return;
    }

    if (commentId) {
        const comment = getState().comments.byId[commentId];
        if (comment) {
            if (comment.commentId) {
                const allIds =
                    getState().comments.allIds[comment.commentId] || [];
                const newAllIds = allIds.filter((id) => id !== commentId);
                dispatch(updateCommentsAllIds(comment.commentId, newAllIds));
            } else {
                const allIds =
                    getState().comments.allIds[comment.frameId] || [];
                const newAllIds = allIds.filter((id) => id !== commentId);
                dispatch(updateCommentsAllIds(comment.frameId, newAllIds));
            }
            dispatch(removeCommentsById(commentId));
        }
    } else if (frameId) {
        const frame = getState().frames.byId[frameId];
        if (frame) {
            const framesAllIds = getState().frames.allIds[''] || [];
            if (framesAllIds.length) {
                const newFramesAllIds = framesAllIds.filter(
                    (id) => id !== frameId
                );
                dispatch(setFramesAllIds(newFramesAllIds));
            }
            const galerieFramesAllIds =
                getState().frames.allIds[frame.galerieId] || [];
            if (galerieFramesAllIds.length) {
                const newGalerieFramesAllIds = galerieFramesAllIds.filter(
                    (id) => id !== frameId
                );
                dispatch(
                    setGalerieFramesAllIds(
                        frame.galerieId,
                        newGalerieFramesAllIds
                    )
                );
            }
            dispatch(removeFramesById(frameId));
        }
    } else if (profilePictureId) {
        const profilePicture =
            getState().profilePictures.byId[profilePictureId];
        if (profilePicture) {
            dispatch(removeProfilePicturesId(profilePicture.userId));
            dispatch(removeProfilePicturesById(profilePictureId));
        }
    }
    dispatch(updateReportsLoadingPost('SUCCESS'));
};

export default successPostMethod;
