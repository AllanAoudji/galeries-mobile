import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api';
import { COMMENTS } from '#store/genericActionTypes';

const dispatchPostFrameComments = (
    dispatch: Dispatch<Store.Action>,
    frameId: string,
    payload: { body: string }
) => {
    dispatch(
        apiRequest({
            meta: {
                entity: COMMENTS,
                method: 'POST',
                query: { frameId },
                url: `${END_POINT.FRAMES}/${frameId}${END_POINT.COMMENTS}`,
            },
            payload,
        })
    );
};

export default dispatchPostFrameComments;
