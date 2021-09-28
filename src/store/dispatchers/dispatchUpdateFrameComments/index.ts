import { Dispatch } from 'redux';

import { updateFramesById } from '#store/frames';

const dispatchUpdateFrameComments = (
    dispatch: Dispatch<Store.Action>,
    frame: Store.Models.Frame,
    comments: {
        allIds?: string[];
        end?: boolean;
        previous?: string;
        status?: Store.Status;
    }
) => {
    dispatch(
        updateFramesById({
            ...frame,
            comments: {
                allIds: [
                    ...(frame.comments ? frame.comments.allIds : []),
                    ...(comments.allIds || []),
                ],
                end:
                    comments.end ||
                    (frame.comments ? frame.comments.end : false),
                previous:
                    comments.previous ||
                    (frame.comments ? frame.comments.previous : undefined),
                status:
                    comments.status ||
                    (frame.comments ? frame.comments.status : 'PENDING'),
            },
        })
    );
};

export default dispatchUpdateFrameComments;
