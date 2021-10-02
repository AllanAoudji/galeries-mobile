import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api/actionCreators';
import { COMMENTS } from '#store/genericActionTypes';

const dispatchGetCommentComments = (
    dispatch: Dispatch<Store.Action>,
    commentId: string,
    previous?: string
) => {
    let query = '?';
    if (previous) query = `${query}previous=${previous}`;

    dispatch(
        apiRequest({
            meta: {
                entity: COMMENTS,
                query: { commentId },
                method: 'GET',
                url: `${END_POINT.COMMENTS}/${commentId}${END_POINT.COMMENTS}${query}`,
            },
            payload: {},
        })
    );
};

export default dispatchGetCommentComments;
