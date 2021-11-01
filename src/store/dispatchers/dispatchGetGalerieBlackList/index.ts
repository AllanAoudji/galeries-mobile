import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api/actionCreators';
import { GALERIE_BLACKLISTS } from '#store/genericActionTypes';

const dispatchGetGalerieBlackList = (
    dispatch: Dispatch<Store.Action>,
    galerieId: string,
    galerieBlackListId: string
) => {
    dispatch(
        apiRequest({
            meta: {
                query: { galerieId, galerieBlackListId },
                entity: GALERIE_BLACKLISTS,
                method: 'GET',
                url: `${END_POINT.GALERIES}/${galerieId}${END_POINT.BLACKLISTS}/${galerieBlackListId}`,
            },
            payload: {},
        })
    );
};

export default dispatchGetGalerieBlackList;
