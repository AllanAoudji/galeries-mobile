import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api';
import { LIKES } from '#store/genericActionTypes';

const dispatchPostLike = (
    dispatch: Dispatch<Store.Action>,
    frameId: string
) => {
    dispatch(
        apiRequest({
            meta: {
                entity: LIKES,
                method: 'POST',
                query: { frameId },
                url: `${END_POINT.FRAMES}/${frameId}${END_POINT.LIKES}`,
            },
            payload: {},
        })
    );
};

export default dispatchPostLike;
