import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api';
import { USERS } from '#store/genericActionTypes';

const dispatchGetGalerieUsers = (
    dispatch: Dispatch<Store.Action>,
    galerieId: string,
    previous?: string
) => {
    let query = '?';
    if (previous) query = `${query}previous=${previous}`;
    dispatch(
        apiRequest({
            meta: {
                entity: USERS,
                method: 'GET',
                query: { galerieId },
                url: `${END_POINT.GALERIES}/${galerieId}${END_POINT.USERS}${query}`,
            },
            payload: {},
        })
    );
};

export default dispatchGetGalerieUsers;
