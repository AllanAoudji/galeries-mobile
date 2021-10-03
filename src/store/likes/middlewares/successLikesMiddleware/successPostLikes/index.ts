import { Dispatch } from 'redux';
import { getFrame, getMeId } from '#store/getters';
import { removeLikesById, setLikesById } from '#store/likes';
import { updateFramesById } from '#store/frames';

const successPostLikes = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    const frameId = action.meta.query ? action.meta.query.frameId : undefined;
    if (!frameId) return;
    const frame = getFrame(getState, frameId);
    if (!frame) return;
    if (
        typeof action.payload !== 'object' ||
        typeof action.payload.data !== 'object' ||
        typeof action.payload.data.liked !== 'boolean' ||
        typeof action.payload.data.numOfLikes !== 'number'
    )
        return;

    const { liked, numOfLikes, createdLike } = action.payload.data;
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
                dispatch(
                    updateFramesById({
                        ...frame,
                        liked,
                        numOfLikes,
                        likes: {
                            allIds,
                            end: frame.likes ? frame.likes.end : false,
                            previous: frame.likes
                                ? frame.likes.previous
                                : undefined,
                            status: frame.likes
                                ? frame.likes.status
                                : 'PENDING',
                        },
                    })
                );
            }
        } else {
            dispatch(
                updateFramesById({
                    ...frame,
                    liked,
                    numOfLikes,
                })
            );
        }
    } else {
        if (typeof createdLike !== 'object') return;
        const oldAllIds = frame.likes ? frame.likes.allIds : [];
        const newAllIds = [createdLike.id, ...oldAllIds];
        dispatch(setLikesById({ [createdLike.id]: createdLike }));
        dispatch(
            updateFramesById({
                ...frame,
                liked,
                numOfLikes,
                likes: {
                    allIds: newAllIds,
                    end: frame.likes ? frame.likes.end : false,
                    previous: frame.likes ? frame.likes.previous : undefined,
                    status: frame.likes ? frame.likes.status : 'PENDING',
                },
            })
        );
    }
};

export default successPostLikes;
