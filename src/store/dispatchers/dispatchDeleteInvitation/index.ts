import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api/actionCreators';
import { INVITATIONS } from '#store/genericActionTypes';

const dispatchDeleteInvitation: (
    dispatch: Dispatch<Store.Action>,
    invitationId: string
) => void = (dispatch, invitationId) => {
    dispatch(
        apiRequest({
            meta: {
                query: { invitationId },
                entity: INVITATIONS,
                method: 'DELETE',
                url: `${END_POINT.INVITATIONS}/${invitationId}`,
            },
            payload: {},
        })
    );
};

export default dispatchDeleteInvitation;
