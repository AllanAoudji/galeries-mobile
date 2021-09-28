import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api';
import { USERS } from '#store/genericActionTypes';

const dispatchGetUser: (
    dispatch: Dispatch<Store.Action>,
    userId: string
) => void = (dispatch, userId) => {
    dispatch(
        apiRequest({
            meta: {
                entity: USERS,
                method: 'GET',
                url: `${END_POINT.USERS}/${userId}`,
            },
            payload: {},
        })
    );
};

export default dispatchGetUser;
