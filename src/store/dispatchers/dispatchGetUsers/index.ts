import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api/actionCreators';
import { USERS } from '#store/genericActionTypes';

const dispatchGetUsers: (
    dispatch: Dispatch<Store.Action>,
    previous?: string
) => void = (dispatch, previous) => {
    let query = '?';
    if (previous) query = `${query}previous=${previous}`;

    dispatch(
        apiRequest({
            meta: {
                entity: USERS,
                method: 'GET',
                url: `${END_POINT.USERS}${query}`,
            },
            payload: {},
        })
    );
};

export default dispatchGetUsers;
