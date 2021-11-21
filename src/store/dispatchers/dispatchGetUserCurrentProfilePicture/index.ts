import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api/actionCreators';
import { PROFILE_PICTURES } from '#store/genericActionTypes';

const dispatchGetUserCurrentProfilePicture: (
    dispatch: Dispatch<Store.Action>,
    userId: string
) => void = (dispatch, userId) => {
    dispatch(
        apiRequest({
            meta: {
                entity: PROFILE_PICTURES,
                method: 'GET',
                query: { userId },
                url: `${END_POINT.USERS}/${userId}${END_POINT.CURRENT_PROFILE_PICTURE}`,
            },
            payload: {},
        })
    );
};

export default dispatchGetUserCurrentProfilePicture;
