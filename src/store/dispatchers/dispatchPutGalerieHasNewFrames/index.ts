import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api';
import { GALERIES } from '#store/genericActionTypes';

const dispatchPutGalerieHasNewFrames = (
    dispatch: Dispatch<Store.Action>,
    galerieId: string
) => {
    dispatch(
        apiRequest({
            meta: {
                entity: GALERIES,
                method: 'PUT',
                query: { galerieId },
                url: `${END_POINT.GALERIES}/${galerieId}${END_POINT.HAS_NEW_FRAMES}`,
            },
            payload: {},
        })
    );
};

export default dispatchPutGalerieHasNewFrames;
