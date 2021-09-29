import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api/actionCreators';
import { PROFILE_PICTURES } from '#store/genericActionTypes';

const dispatchGetprofilePicture: (
    dispatch: Dispatch<Store.Action>,
    profilePictureId: string
) => void = (dispatch, profilePictureId) => {
    dispatch(
        apiRequest({
            meta: {
                entity: PROFILE_PICTURES,
                method: 'GET',
                url: `${END_POINT.PROFILE_PICTURES}/${profilePictureId}`,
            },
            payload: {},
        })
    );
};

export default dispatchGetprofilePicture;
