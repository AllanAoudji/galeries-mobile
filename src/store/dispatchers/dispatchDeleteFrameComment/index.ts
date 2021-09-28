import { Dispatch } from 'redux';

import { updateFramesById } from '#store/frames';

const dispatchDeleteFrameComment = (
    dispatch: Dispatch<Store.Action>,
    frame: Store.Models.Frame,
    commentId: string
) => {
    const allIds = frame.comments ? frame.comments.allIds : [];
    if (allIds.length) {
        const defaultComments: typeof frame.comments = {
            allIds: [],
            end: false,
            status: 'PENDING',
        };
        const newAllIds = allIds.filter((id) => id !== commentId);
        dispatch(
            updateFramesById({
                ...frame,
                comments: {
                    ...(frame.comments || defaultComments),
                    allIds: newAllIds,
                },
            })
        );
    }
};

export default dispatchDeleteFrameComment;
