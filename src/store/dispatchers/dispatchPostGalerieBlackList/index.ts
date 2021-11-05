import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api/actionCreators';
import { GALERIE_BLACKLISTS } from '#store/genericActionTypes';

const dispatchPostGalerieBlackList = (
    dispatch: Dispatch<Store.Action>,
    galerieId: string,
    userId: string
) => {
    dispatch(
        apiRequest({
            meta: {
                query: { galerieId },
                entity: GALERIE_BLACKLISTS,
                method: 'POST',
                url: `${END_POINT.GALERIES}/${galerieId}${END_POINT.USERS}/${userId}${END_POINT.BLACKLISTS}`,
            },
            payload: {},
        })
    );
};

export default dispatchPostGalerieBlackList;
