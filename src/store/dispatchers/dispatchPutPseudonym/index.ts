import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api';
import { ME } from '#store/genericActionTypes';

const dispatchPutPseudonym = (
    dispatch: Dispatch<Store.Action>,
    payload: { pseudonym: string }
) => {
    dispatch(
        apiRequest({
            meta: {
                entity: ME,
                method: 'PUT',
                url: `${END_POINT.USERS}${END_POINT.ME}${END_POINT.PSEUDONYM}`,
            },
            payload,
        })
    );
};

export default dispatchPutPseudonym;
