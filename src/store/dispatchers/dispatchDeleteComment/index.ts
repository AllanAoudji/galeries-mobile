import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api/actionCreators';
import { COMMENTS } from '#store/genericActionTypes';

const dispatchDeleteComment = (
    dispatch: Dispatch<Store.Action>,
    frameId: string,
    commentId: string
) => {
    dispatch(
        apiRequest({
            meta: {
                entity: COMMENTS,
                query: { frameId },
                method: 'DELETE',
                url: `${END_POINT.COMMENTS}/${commentId}`,
            },
            payload: {},
        })
    );
};

export default dispatchDeleteComment;
