import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api/actionCreators';
import { INVITATIONS } from '#store/genericActionTypes';

const dispatchPostInvitations = (
    dispatch: Dispatch<Store.Action>,
    galerieId: string,
    payload: { numOfInvits?: number; time?: number }
) => {
    dispatch(
        apiRequest({
            meta: {
                entity: INVITATIONS,
                method: 'POST',
                query: { galerieId },
                url: `${END_POINT.GALERIES}/${galerieId}${END_POINT.INVITATIONS}`,
            },
            payload,
        })
    );
};

export default dispatchPostInvitations;
