import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api';
import { NOTIFICATIONS } from '#store/genericActionTypes';

const dispatchDeleteNotification = (
    dispatch: Dispatch<Store.Action>,
    notificationId: string
) => {
    dispatch(
        apiRequest({
            meta: {
                query: { notificationId },
                entity: NOTIFICATIONS,
                method: 'DELETE',
                url: `${END_POINT.NOTIFICATIONS}/${notificationId}`,
            },
            payload: {},
        })
    );
};

export default dispatchDeleteNotification;
