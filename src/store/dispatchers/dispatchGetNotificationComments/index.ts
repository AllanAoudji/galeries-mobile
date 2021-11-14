import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api';
import { COMMENTS } from '#store/genericActionTypes';

const dispatchGetNotificationComments = (
    dispatch: Dispatch<Store.Action>,
    notificationId: string
) => {
    dispatch(
        apiRequest({
            meta: {
                entity: COMMENTS,
                query: { notificationId },
                method: 'GET',
                url: `${END_POINT.NOTIFICATIONS}/${notificationId}${END_POINT.COMMENTS}`,
            },
            payload: {},
        })
    );
};

export default dispatchGetNotificationComments;
