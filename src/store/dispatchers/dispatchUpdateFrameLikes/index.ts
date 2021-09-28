import { Dispatch } from 'redux';

import { updateFramesById } from '#store/frames';

const dispatchUpdateFrameLikes = (
    dispatch: Dispatch<Store.Action>,
    frame: Store.Models.Frame,
    likes: {
        allIds?: string[];
        end?: boolean;
        previous?: string;
        status?: Store.Status;
    }
) => {
    dispatch(
        updateFramesById({
            ...frame,
            likes: {
                allIds: [
                    ...(frame.likes ? frame.likes.allIds : []),
                    ...(likes.allIds || []),
                ],
                end: likes.end || (frame.likes ? frame.likes.end : false),
                previous:
                    likes.previous ||
                    (frame.likes ? frame.likes.previous : undefined),
                status:
                    likes.status ||
                    (frame.likes ? frame.likes.status : 'PENDING'),
            },
        })
    );
};

export default dispatchUpdateFrameLikes;
