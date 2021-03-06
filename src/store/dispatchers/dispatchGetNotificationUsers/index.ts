import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api';
import { USERS } from '#store/genericActionTypes';

const dispatchGetNotificationUsers = (
    dispatch: Dispatch<Store.Action>,
    notificationId: string
) => {
    dispatch(
        apiRequest({
            meta: {
                entity: USERS,
                query: { notificationId },
                method: 'GET',
                url: `${END_POINT.NOTIFICATIONS}/${notificationId}${END_POINT.USERS}`,
            },
            payload: {},
        })
    );
};

export default dispatchGetNotificationUsers;
