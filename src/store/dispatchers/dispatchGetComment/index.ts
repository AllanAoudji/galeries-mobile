import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api/actionCreators';
import { COMMENTS } from '#store/genericActionTypes';

const dispatchGetComment = (
    dispatch: Dispatch<Store.Action>,
    commentId: string
) => {
    dispatch(
        apiRequest({
            meta: {
                entity: COMMENTS,
                method: 'GET',
                url: `${END_POINT.COMMENTS}/${commentId}`,
            },
            payload: {},
        })
    );
};

export default dispatchGetComment;
