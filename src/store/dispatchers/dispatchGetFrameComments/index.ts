import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api/actionCreators';
import { COMMENTS } from '#store/genericActionTypes';

const dispatchGetFrameComments = (
    dispatch: Dispatch<Store.Action>,
    frameId: string,
    previous?: string
) => {
    let query = '?';
    if (previous) query = `${query}previous=${previous}`;

    dispatch(
        apiRequest({
            meta: {
                entity: COMMENTS,
                query: { frameId },
                method: 'GET',
                url: `${END_POINT.FRAMES}/${frameId}${END_POINT.COMMENTS}${query}`,
            },
            payload: {},
        })
    );
};

export default dispatchGetFrameComments;
