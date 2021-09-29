import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api/actionCreators';
import { FRAMES } from '#store/genericActionTypes';

const dispatchGetFrames: (
    dispatch: Dispatch<Store.Action>,
    previous?: string
) => void = (dispatch, previous) => {
    const query = previous ? `?previous=${previous}` : '';
    dispatch(
        apiRequest({
            payload: {},
            meta: {
                entity: FRAMES,
                method: 'GET',
                url: `${END_POINT.FRAMES}${query}`,
            },
        })
    );
};

export default dispatchGetFrames;
