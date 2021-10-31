import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api';
import { USERS } from '#store/genericActionTypes';

const dispatchPutGalerieUserRole = (
    dispatch: Dispatch<Store.Action>,
    galerieId: string,
    userId: string
) => {
    dispatch(
        apiRequest({
            meta: {
                entity: USERS,
                method: 'PUT',
                query: { galerieId, userId },
                url: `${END_POINT.GALERIES}/${galerieId}${END_POINT.USERS}/${userId}`,
            },
            payload: {},
        })
    );
};

export default dispatchPutGalerieUserRole;
