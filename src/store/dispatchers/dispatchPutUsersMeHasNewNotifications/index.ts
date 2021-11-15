import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api';
import { ME } from '#store/genericActionTypes';

const dispatchPutUsersMeHasNewNotifications = (
    dispatch: Dispatch<Store.Action>
) => {
    dispatch(
        apiRequest({
            meta: {
                entity: ME,
                method: 'PUT',
                url: `${END_POINT.USERS}${END_POINT.ME}${END_POINT.HAS_NEW_NOTIFICATIONS}`,
            },
            payload: {},
        })
    );
};

export default dispatchPutUsersMeHasNewNotifications;
