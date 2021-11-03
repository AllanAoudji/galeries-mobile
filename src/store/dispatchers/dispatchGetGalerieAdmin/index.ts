import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api/actionCreators';
import { GALERIES } from '#store/genericActionTypes';

const dispatchGetGalerieAdmin = (
    dispatch: Dispatch<Store.Action>,
    galerieId: string
) => {
    dispatch(
        apiRequest({
            meta: {
                entity: GALERIES,
                method: 'GET',
                query: { galerieId },
                url: `${END_POINT.GALERIES}/${galerieId}${END_POINT.ADMIN}`,
            },
            payload: {},
        })
    );
};

export default dispatchGetGalerieAdmin;
