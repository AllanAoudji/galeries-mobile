import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api/actionCreators';
import { INVITATIONS } from '#store/genericActionTypes';

const dispatchRefreshGalerieInvitations = (
    dispatch: Dispatch<Store.Action>,
    galerieId: string
) => {
    dispatch(
        apiRequest({
            meta: {
                entity: INVITATIONS,
                method: 'GET',
                query: { galerieId },
                refresh: true,
                url: `${END_POINT.GALERIES}/${galerieId}${END_POINT.INVITATIONS}`,
            },
            payload: {},
        })
    );
};

export default dispatchRefreshGalerieInvitations;
