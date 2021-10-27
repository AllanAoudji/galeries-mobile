import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api';
import { GALERIES } from '#store/genericActionTypes';

const dispatchPutGalerieAllowNotification = (
    dispatch: Dispatch<Store.Action>,
    galerieId: string
) => {
    dispatch(
        apiRequest({
            meta: {
                entity: GALERIES,
                method: 'PUT',
                query: { galerieId },
                url: `${END_POINT.GALERIES}/${galerieId}${END_POINT.ALLOW_NOTIFICATION}`,
            },
            payload: {},
        })
    );
};

export default dispatchPutGalerieAllowNotification;
