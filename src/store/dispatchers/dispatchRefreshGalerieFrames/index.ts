import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api/actionCreators';
import { FRAMES } from '#store/genericActionTypes';

const dispatchRefreshGalerieFrames: (
    dispatch: Dispatch<Store.Action>,
    galerieId: string
) => void = (dispatch, galerieId) => {
    dispatch(
        apiRequest({
            meta: {
                entity: FRAMES,
                method: 'GET',
                query: { galerieId },
                refresh: true,
                url: `${END_POINT.GALERIES}/${galerieId}${END_POINT.FRAMES}`,
            },
            payload: {},
        })
    );
};

export default dispatchRefreshGalerieFrames;
