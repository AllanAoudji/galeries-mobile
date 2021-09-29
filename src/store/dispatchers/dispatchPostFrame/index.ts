import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api/actionCreators';
import { FRAMES } from '#store/genericActionTypes';

const dispatchPostFrame = (
    dispatch: Dispatch<Store.Action>,
    galerieId: string,
    payload: FormData
) => {
    dispatch(
        apiRequest({
            meta: {
                entity: FRAMES,
                method: 'POST',
                query: { galerieId },
                url: `${END_POINT.GALERIES}/${galerieId}/${END_POINT.FRAMES}`,
            },
            payload,
        })
    );
};

export default dispatchPostFrame;
