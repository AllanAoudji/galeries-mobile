import { Dispatch } from 'redux';

import { apiRequest } from '#store/api/actionCreators';
import { COMMENTS } from '#store/genericActionTypes';
import { END_POINT } from '#helpers/constants';

const dispatchPostCommentComments = (
    dispatch: Dispatch<Store.Action>,
    commentId: string,
    payload: { body: string }
) => {
    dispatch(
        apiRequest({
            meta: {
                entity: COMMENTS,
                method: 'POST',
                query: { commentId },
                url: `${END_POINT.COMMENTS}/${commentId}${END_POINT.COMMENTS}`,
            },
            payload,
        })
    );
};

export default dispatchPostCommentComments;
