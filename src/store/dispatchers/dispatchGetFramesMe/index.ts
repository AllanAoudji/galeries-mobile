import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api';
import { FRAMES } from '#store/genericActionTypes';

const dispatchGetFramesMe = (
    dispatch: Dispatch<Store.Action>,
    userId: string,
    previous?: string
) => {
    let query = '?me=true';
    if (previous) query = `${query}&previous=${previous}`;

    dispatch(
        apiRequest({
            meta: {
                entity: FRAMES,
                method: 'GET',
                query: { userId },
                url: `${END_POINT.FRAMES}${query}`,
            },
            payload: {},
        })
    );
};

export default dispatchGetFramesMe;
