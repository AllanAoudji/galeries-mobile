import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api/actionCreators';
import { GALERIE_BLACKLISTS } from '#store/genericActionTypes';

const dispatchDeleteGalerieBlackList = (
    dispatch: Dispatch<Store.Action>,
    galerieId: string,
    galerieBlackListId: string
) => {
    dispatch(
        apiRequest({
            meta: {
                entity: GALERIE_BLACKLISTS,
                query: { galerieId, galerieBlackListId },
                method: 'DELETE',
                url: `${END_POINT.GALERIES}/${galerieId}${END_POINT.BLACKLISTS}/${galerieBlackListId}`,
            },
            payload: {},
        })
    );
};

export default dispatchDeleteGalerieBlackList;
