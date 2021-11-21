import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api/actionCreators';
import { PROFILE_PICTURES } from '#store/genericActionTypes';

const dispatchGetProfilePictures: (
    dispatch: Dispatch<Store.Action>,
    previous?: string
) => void = (dispatch, previous) => {
    let query = '?';
    if (previous) query = `${query}previous=${previous}`;
    dispatch(
        apiRequest({
            meta: {
                entity: PROFILE_PICTURES,
                method: 'GET',
                url: `${END_POINT.PROFILE_PICTURES}${query}`,
            },
            payload: {},
        })
    );
};

export default dispatchGetProfilePictures;
