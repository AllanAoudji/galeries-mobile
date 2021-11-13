import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api/actionCreators';
import { NOTIFICATIONS } from '#store/genericActionTypes';

const dispatchGetNotificationFrames = (
    dispatch: Dispatch<Store.Action>,
    notificationId: string
) => {
    dispatch(
        apiRequest({
            meta: {
                entity: NOTIFICATIONS,
                query: { notificationId },
                method: 'GET',
                url: `${END_POINT.NOTIFICATIONS}/${notificationId}${END_POINT.FRAMES}`,
            },
            payload: {},
        })
    );
};

export default dispatchGetNotificationFrames;
