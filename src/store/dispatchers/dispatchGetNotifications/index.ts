import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api/actionCreators';
import { NOTIFICATIONS } from '#store/genericActionTypes';

const dispatchGetNotifications = (
    dispatch: Dispatch<Store.Action>,
    previous?: string
) => {
    let query = '?';
    if (previous) query = `${query}previous=${previous}`;
    dispatch(
        apiRequest({
            meta: {
                entity: NOTIFICATIONS,
                method: 'GET',
                url: `${END_POINT.NOTIFICATIONS}${query}`,
            },
            payload: {},
        })
    );
};

export default dispatchGetNotifications;
