import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api';
import { ME } from '#store/genericActionTypes';

const dispatchPutEmail = (
    dispatch: Dispatch<Store.Action>,
    payload: { password: string }
) => {
    dispatch(
        apiRequest({
            meta: {
                entity: ME,
                method: 'POST',
                url: `${END_POINT.USERS}${END_POINT.ME}${END_POINT.EMAIL}`,
            },
            payload,
        })
    );
};

export default dispatchPutEmail;
