import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api';
import { FRAMES } from '#store/genericActionTypes';

const dispatchGetGalerieFrames: (
    dispatch: Dispatch<Store.Action>,
    galerieId: string,
    previous?: string
) => void = (dispatch, galerieId, previous) => {
    const query = previous ? `?previous=${previous}` : '';
    dispatch(
        apiRequest({
            meta: {
                query: { galerieId },
                entity: FRAMES,
                method: 'GET',
                url: `${END_POINT.GALERIES}/${galerieId}/${END_POINT.FRAMES}${query}`,
            },
            payload: {},
        })
    );
};

export default dispatchGetGalerieFrames;
