import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api/actionCreators';
import { GALERIES } from '#store/genericActionTypes';

const dispatchPutGalerie = (
    dispatch: Dispatch<Store.Action>,
    galerieId: string,
    payload: {
        description: string;
        name: string;
    }
) => {
    dispatch(
        apiRequest({
            meta: {
                entity: GALERIES,
                method: 'PUT',
                query: { galerieId },
                url: `${END_POINT.GALERIES}/${galerieId}`,
            },
            payload,
        })
    );
};

export default dispatchPutGalerie;
