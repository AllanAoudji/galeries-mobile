import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api';
import { INVITATIONS } from '#store/genericActionTypes';

const dispatchGetInvitation: (
    dispatch: Dispatch<Store.Action>,
    invitationId: string
) => void = (dispatch, invitationId) => {
    dispatch(
        apiRequest({
            meta: {
                entity: INVITATIONS,
                method: 'GET',
                url: `${END_POINT.INVITATIONS}/${invitationId}`,
            },
            payload: {},
        })
    );
};

export default dispatchGetInvitation;
