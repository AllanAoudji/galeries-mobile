import { Dispatch } from 'redux';

import { apiRequest } from '#store/api';
import { REPORTS } from '#store/genericActionTypes';
import { END_POINT } from '#helpers/constants';

const dispatchPostCommentIdReports = (
    dispatch: Dispatch<Store.Action>,
    commentId: string,
    payload: { reason: string }
) => {
    dispatch(
        apiRequest({
            meta: {
                entity: REPORTS,
                method: 'POST',
                query: { commentId },
                url: `${END_POINT.COMMENTS}/${commentId}${END_POINT.REPORTS}`,
            },
            payload,
        })
    );
};

export default dispatchPostCommentIdReports;
