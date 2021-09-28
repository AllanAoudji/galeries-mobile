import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api';
import { PROFILE_PICTURES } from '#store/genericActionTypes';

const dispatchGetProfilePictures: (dispatch: Dispatch<Store.Action>) => void = (
    dispatch
) => {
    dispatch(
        apiRequest({
            meta: {
                entity: PROFILE_PICTURES,
                method: 'GET',
                url: `${END_POINT.PROFILE_PICTURES}`,
            },
            payload: {},
        })
    );
};

export default dispatchGetProfilePictures;
