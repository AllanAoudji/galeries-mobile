import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api/actionCreators';
import { COMMENTS } from '#store/genericActionTypes';

const dispatchRefreshFrameComments = (
    dispatch: Dispatch<Store.Action>,
    frameId: string
) => {
    dispatch(
        apiRequest({
            meta: {
                entity: COMMENTS,
                method: 'GET',
                query: { frameId },
                refresh: true,
                url: `${END_POINT.FRAMES}/${frameId}${END_POINT.COMMENTS}`,
            },
            payload: {},
        })
    );
};

export default dispatchRefreshFrameComments;
