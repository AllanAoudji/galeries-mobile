import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api';
import { LOGIN } from '#store/genericActionTypes';

const dispatchLogin = (
    dispatch: Dispatch<Store.Action>,
    payload: {
        password: string;
        userNameOrEmail: string;
    }
) => {
    dispatch(
        apiRequest({
            meta: {
                entity: LOGIN,
                method: 'POST',
                url: END_POINT.LOGIN,
            },
            payload,
        })
    );
};

export default dispatchLogin;
