import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api/actionCreators';
import { RESET_PASSWORD } from '#store/genericActionTypes';

const dispatchPostUsersPassword = (
    dispatch: Dispatch<Store.Action>,
    payload: { email: string }
) => {
    dispatch(
        apiRequest({
            meta: {
                entity: RESET_PASSWORD,
                method: 'POST',
                url: `${END_POINT.USERS}${END_POINT.PASSWORD}`,
            },
            payload,
        })
    );
};

export default dispatchPostUsersPassword;
