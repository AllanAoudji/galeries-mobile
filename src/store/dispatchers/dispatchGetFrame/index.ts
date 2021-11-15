import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api/actionCreators';
import { FRAMES } from '#store/genericActionTypes';

const dispatchGetFrame: (
    dispatch: Dispatch<Store.Action>,
    frameId: string
) => void = (dispatch, frameId) => {
    dispatch(
        apiRequest({
            meta: {
                entity: FRAMES,
                method: 'GET',
                query: { frameId },
                url: `${END_POINT.FRAMES}/${frameId}`,
            },
            payload: {},
        })
    );
};

export default dispatchGetFrame;
