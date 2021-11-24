import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api/actionCreators';
import { SIGNIN } from '#store/genericActionTypes';

const dispatchSignin = (
    dispatch: Dispatch<Store.Action>,
    payload: {
        email: string;
        userName: string;
        password: string;
        confirmPasswors: string;
        betaKey: string;
    }
) => {
    dispatch(
        apiRequest({
            meta: {
                entity: SIGNIN,
                method: 'POST',
                url: `${END_POINT.USERS}${END_POINT.SIGNIN}${END_POINT.BETA}`,
            },
            payload,
        })
    );
};

export default dispatchSignin;
