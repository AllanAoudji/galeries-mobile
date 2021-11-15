import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api';
import { NOTIFICATIONS } from '#store/genericActionTypes';

const dispatchRefreshNotifications = (dispatch: Dispatch<Store.Action>) => {
    dispatch(
        apiRequest({
            meta: {
                entity: NOTIFICATIONS,
                method: 'GET',
                refresh: true,
                url: `${END_POINT.NOTIFICATIONS}`,
            },
            payload: {},
        })
    );
};

export default dispatchRefreshNotifications;
