import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api/actionCreators';
import { GALERIES } from '#store/genericActionTypes';

const dispatchDeleteGalerie: (
    dispatch: Dispatch<Store.Action>,
    galerieId: string,
    payload: {
        password: string;
        name: string;
    }
) => void = (dispatch, galerieId, payload) => {
    dispatch(
        apiRequest({
            meta: {
                entity: GALERIES,
                method: 'DELETE',
                url: `${END_POINT.GALERIES}/${galerieId}`,
            },
            payload,
        })
    );
};

export default dispatchDeleteGalerie;
