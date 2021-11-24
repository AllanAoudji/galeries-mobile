import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api/actionCreators';
import { CONFIRM_ACCOUNT } from '#store/genericActionTypes';

const dispatchPostUsersConfirmation: (
    dispatch: Dispatch<Store.Action>,
    payload: { email: string }
) => void = (dispatch, payload) => {
    dispatch(
        apiRequest({
            meta: {
                entity: CONFIRM_ACCOUNT,
                method: 'POST',
                url: `${END_POINT.USERS}${END_POINT.CONFIRMATION}`,
            },
            payload,
        })
    );
};

export default dispatchPostUsersConfirmation;
