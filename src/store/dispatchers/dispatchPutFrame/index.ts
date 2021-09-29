import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api/actionCreators';
import { FRAMES } from '#store/genericActionTypes';

const dispatchPutFrame = (
    dispatch: Dispatch<Store.Action>,
    frameId: string,
    payload: {
        description: string;
    }
) => {
    dispatch(
        apiRequest({
            meta: {
                entity: FRAMES,
                method: 'PUT',
                query: { frameId },
                url: `${END_POINT.FRAMES}/${frameId}`,
            },
            payload,
        })
    );
};

export default dispatchPutFrame;
