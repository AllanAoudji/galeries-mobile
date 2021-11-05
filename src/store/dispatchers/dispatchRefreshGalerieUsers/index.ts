import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api/actionCreators';
import { USERS } from '#store/genericActionTypes';

const dispatchRefreshGalerieUsers = (
    dispatch: Dispatch<Store.Action>,
    galerieId: string
) => {
    dispatch(
        apiRequest({
            meta: {
                entity: USERS,
                method: 'GET',
                query: { galerieId },
                refresh: true,
                url: `${END_POINT.GALERIES}/${galerieId}${END_POINT.USERS}`,
            },
            payload: {},
        })
    );
};

export default dispatchRefreshGalerieUsers;
