import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api';
import { LOGOUT } from '#store/genericActionTypes';

const dispatchLogout = (dispatch: Dispatch<Store.Action>) => {
    dispatch(
        apiRequest({
            meta: {
                entity: LOGOUT,
                method: 'GET',
                url: END_POINT.LOGOUT,
            },
            payload: {},
        })
    );
};

export default dispatchLogout;
