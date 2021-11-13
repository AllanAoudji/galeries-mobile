import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api/actionCreators';
import { NOTIFICATIONS } from '#store/genericActionTypes';

const dispatchGetNotification = (
    dispatch: Dispatch<Store.Action>,
    notificationId: string
) => {
    dispatch(
        apiRequest({
            meta: {
                entity: NOTIFICATIONS,
                method: 'GET',
                query: { notificationId },
                url: `${END_POINT.NOTIFICATIONS}/${notificationId}`,
            },
            payload: {},
        })
    );
};

export default dispatchGetNotification;
