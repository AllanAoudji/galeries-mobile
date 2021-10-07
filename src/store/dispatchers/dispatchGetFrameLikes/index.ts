import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api/actionCreators';
import { LIKES } from '#store/genericActionTypes';

const dispatchGetFrameLikes = (
    dispatch: Dispatch<Store.Action>,
    frameId: string,
    previous?: string
) => {
    let query = '?';
    if (previous) query = `${query}previous=${previous}`;
    dispatch(
        apiRequest({
            meta: {
                query: { frameId },
                method: 'GET',
                entity: LIKES,
                url: `${END_POINT.FRAMES}/${frameId}${END_POINT.LIKES}${query}`,
            },
            payload: {},
        })
    );
};

export default dispatchGetFrameLikes;
