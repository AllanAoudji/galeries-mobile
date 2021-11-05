import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api/actionCreators';
import { FRAMES } from '#store/genericActionTypes';

const dispatchRefreshFrames: (dispatch: Dispatch<Store.Action>) => void = (
    dispatch
) => {
    dispatch(
        apiRequest({
            meta: {
                entity: FRAMES,
                method: 'GET',
                refresh: true,
                url: `${END_POINT.FRAMES}`,
            },
            payload: {},
        })
    );
};

export default dispatchRefreshFrames;
