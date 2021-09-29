import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api/actionCreators';
import { GALERIE_PICTURES } from '#store/genericActionTypes';

const dispatchGetGalerieCoverPicture = (
    dispatch: Dispatch<Store.Action>,
    galerieId: string
) => {
    dispatch(
        apiRequest({
            meta: {
                entity: GALERIE_PICTURES,
                method: 'GET',
                query: { galerieId },
                url: `${END_POINT.GALERIES}/${galerieId}${END_POINT.COVER_PICTURE}`,
            },
            payload: {},
        })
    );
};

export default dispatchGetGalerieCoverPicture;
