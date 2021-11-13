import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api';
import { NOTIFICATIONS } from '#store/genericActionTypes';

const dispatchPutNotification = (
    dispatch: Dispatch<Store.Action>,
    notificationId: string
) => {
    dispatch(
        apiRequest({
            meta: {
                entity: NOTIFICATIONS,
                method: 'PUT',
                query: { notificationId },
                url: `${END_POINT.NOTIFICATIONS}/${notificationId}`,
            },
            payload: {},
        })
    );
};

export default dispatchPutNotification;
