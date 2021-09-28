import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api';
import { LIKES } from '#store/genericActionTypes';

const dispatchGetFrame = (dispatch: Dispatch<Store.Action>, likeId: string) => {
    dispatch(
        apiRequest({
            meta: {
                entity: LIKES,
                method: 'GET',
                url: `${END_POINT.LIKES}/${likeId}`,
            },
            payload: {},
        })
    );
};

export default dispatchGetFrame;
