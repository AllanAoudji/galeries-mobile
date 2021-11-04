import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api/actionCreators';
import { GALERIE_BLACKLISTS } from '#store/genericActionTypes';

const dispatchRefreshGalerieBlackLists: (
    dispatch: Dispatch<Store.Action>,
    galerieId: string
) => void = (dispatch, galerieId) => {
    dispatch(
        apiRequest({
            meta: {
                entity: GALERIE_BLACKLISTS,
                method: 'GET',
                query: { galerieId },
                refresh: true,
                url: `${END_POINT.GALERIES}/${galerieId}${END_POINT.BLACKLISTS}`,
            },
            payload: {},
        })
    );
};

export default dispatchRefreshGalerieBlackLists;
