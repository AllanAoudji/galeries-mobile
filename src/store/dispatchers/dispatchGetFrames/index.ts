import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api/actionCreators';
import { FRAMES } from '#store/genericActionTypes';

const dispatchGetFrames: (
    dispatch: Dispatch<Store.Action>,
    previous?: string
) => void = (dispatch, previous) => {
    let query = '?';
    if (previous) query = `${query}previous=${previous}`;

    dispatch(
        apiRequest({
            meta: {
                entity: FRAMES,
                method: 'GET',
                url: `${END_POINT.FRAMES}${query}`,
            },
            payload: {},
        })
    );
};

export default dispatchGetFrames;
