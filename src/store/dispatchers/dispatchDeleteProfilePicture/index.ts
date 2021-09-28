import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api';
import { PROFILE_PICTURES } from '#store/genericActionTypes';

const dispatchDeleteProfilePicture: (
    dispatch: Dispatch<Store.Action>,
    profilePictureId: string
) => void = (dispatch, profilePictureId) => {
    dispatch(
        apiRequest({
            meta: {
                entity: PROFILE_PICTURES,
                method: 'DELETE',
                url: `${END_POINT.PROFILE_PICTURES}/${profilePictureId}`,
            },
            payload: {},
        })
    );
};

export default dispatchDeleteProfilePicture;
