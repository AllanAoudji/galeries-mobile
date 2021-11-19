import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api';
import { PROFILE_PICTURES } from '#store/genericActionTypes';

const dispatchPutProfilePicture = (
    dispatch: Dispatch<Store.Action>,
    profilePictureId: string
) => {
    dispatch(
        apiRequest({
            meta: {
                entity: PROFILE_PICTURES,
                method: 'PUT',
                query: { profilePictureId },
                url: `${END_POINT.PROFILE_PICTURES}/${profilePictureId}`,
            },
            payload: {},
        })
    );
};

export default dispatchPutProfilePicture;
