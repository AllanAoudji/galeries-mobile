import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api/actionCreators';
import { INVITATIONS } from '#store/genericActionTypes';

const dispatchGetGalerieInvitations: (
    dispatch: Dispatch<Store.Action>,
    galerieId: string,
    previous?: string
) => void = (dispatch, galerieId, previous) => {
    let query = '?';
    if (previous) query = `${query}previous=${previous}`;

    dispatch(
        apiRequest({
            meta: {
                query: { galerieId },
                entity: INVITATIONS,
                method: 'GET',
                url: `${END_POINT.GALERIES}/${galerieId}${END_POINT.INVITATIONS}${query}`,
            },
            payload: {},
        })
    );
};

export default dispatchGetGalerieInvitations;
