import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api';
import { ME } from '#store/genericActionTypes';

const dispatchGetMe: (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => void = (dispatch) => {
    dispatch(
        apiRequest({
            meta: {
                entity: ME,
                method: 'GET',
                url: `${END_POINT.USERS}${END_POINT.ME}`,
            },
            payload: {},
        })
    );
};

export default dispatchGetMe;
