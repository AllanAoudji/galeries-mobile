import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api/actionCreators';
import { ME } from '#store/genericActionTypes';

const dispatchDeleteMe = (
    dispatch: Dispatch<Store.Action>,
    payload: {
        deleteAccountSentence: string;
        password: string;
        userNameOrEmail: string;
    }
) => {
    dispatch(
        apiRequest({
            meta: {
                entity: ME,
                method: 'DELETE',
                url: `${END_POINT.USERS}${END_POINT.ME}`,
            },
            payload,
        })
    );
};

export default dispatchDeleteMe;
