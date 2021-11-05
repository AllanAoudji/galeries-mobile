import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api/actionCreators';
import { USERS } from '#store/genericActionTypes';

const dispatchDeleteGalerieUser = (
    dispatch: Dispatch<Store.Action>,
    galerieId: string,
    userId: string
) => {
    dispatch(
        apiRequest({
            meta: {
                entity: USERS,
                query: { galerieId, userId },
                method: 'DELETE',
                url: `${END_POINT.GALERIES}/${galerieId}${END_POINT.USERS}/${userId}`,
            },
            payload: {},
        })
    );
};

export default dispatchDeleteGalerieUser;
