import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api/actionCreators';
import { GALERIES } from '#store/genericActionTypes';

const dispatchGetGalerie: (
    dispatch: Dispatch<Store.Action>,
    galerieId: string
) => void = (dispatch, galerieId) => {
    dispatch(
        apiRequest({
            meta: {
                entity: GALERIES,
                method: 'GET',
                url: `${END_POINT.GALERIES}/${galerieId}`,
            },
            payload: {},
        })
    );
};

export default dispatchGetGalerie;
