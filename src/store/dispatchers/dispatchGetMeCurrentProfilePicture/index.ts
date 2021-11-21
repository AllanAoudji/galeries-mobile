import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api/actionCreators';
import { PROFILE_PICTURES } from '#store/genericActionTypes';

const dispatchGetMeCurrentProfilePicture: (
    dispatch: Dispatch<Store.Action>,
    meId: string
) => void = (dispatch, meId) => {
    dispatch(
        apiRequest({
            meta: {
                entity: PROFILE_PICTURES,
                method: 'GET',
                query: { userId: meId },
                url: `${END_POINT.USERS}${END_POINT.ME}${END_POINT.CURRENT_PROFILE_PICTURE}`,
            },
            payload: {},
        })
    );
};

export default dispatchGetMeCurrentProfilePicture;
