import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api';
import { PROFILE_PICTURES } from '#store/genericActionTypes';

const dispatchPostProfilePicture: (
    dispatch: Dispatch<Store.Action>,
    payload: FormData
) => void = (dispatch, payload) => {
    dispatch(
        apiRequest({
            meta: {
                entity: PROFILE_PICTURES,
                method: 'POST',
                url: END_POINT.PROFILE_PICTURES,
            },
            payload,
        })
    );
};

export default dispatchPostProfilePicture;
