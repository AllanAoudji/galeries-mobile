import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api';
import { GALERIES } from '#store/genericActionTypes';

const dispatchUnsubscribeGalerie: (
    dispatch: Dispatch<Store.Action>,
    galerieId: string
) => void = (dispatch, galerieId) => {
    dispatch(
        apiRequest({
            meta: {
                entity: GALERIES,
                method: 'DELETE',
                url: `${END_POINT.GALERIES}/${galerieId}${END_POINT.UNSUBSCRIBE}`,
            },
            payload: {},
        })
    );
};

export default dispatchUnsubscribeGalerie;
