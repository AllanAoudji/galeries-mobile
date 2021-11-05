import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api/actionCreators';
import { GALERIE_BLACKLISTS } from '#store/genericActionTypes';

const dispatchGetGalerieBlackLists = (
    dispatch: Dispatch<Store.Action>,
    galerieId: string,
    previous?: string
) => {
    let query = '?';
    if (previous) query = `${query}previous=${previous}`;

    dispatch(
        apiRequest({
            meta: {
                entity: GALERIE_BLACKLISTS,
                method: 'GET',
                query: { galerieId },
                url: `${END_POINT.GALERIES}/${galerieId}${END_POINT.BLACKLISTS}${query}`,
            },
            payload: {},
        })
    );
};

export default dispatchGetGalerieBlackLists;
