import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api';
import { PROFILE_PICTURES } from '#store/genericActionTypes';

const dispatchGetMeCurrentProfilePicture: (
    dispatch: Dispatch<Store.Action>
) => void = (dispatch) => {
    dispatch(
        apiRequest({
            meta: {
                entity: PROFILE_PICTURES,
                method: 'GET',
                url: `${END_POINT.USERS}${END_POINT.ME}${END_POINT.CURRENT_PROFILE_PICTURE}`,
            },
            payload: {},
        })
    );
};

export default dispatchGetMeCurrentProfilePicture;
