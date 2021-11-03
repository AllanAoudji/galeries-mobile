import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api/actionCreators';
import { USERS } from '#store/genericActionTypes';

const dispatchRefreshUsers = (dispatch: Dispatch<Store.Action>) => {
    dispatch(
        apiRequest({
            meta: {
                entity: USERS,
                method: 'GET',
                refresh: true,
                url: `${END_POINT.USERS}`,
            },
            payload: {},
        })
    );
};

export default dispatchRefreshUsers;
