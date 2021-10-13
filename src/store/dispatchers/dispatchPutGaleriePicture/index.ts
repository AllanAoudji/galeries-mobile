import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api';
import { GALERIE_PICTURES } from '#store/genericActionTypes';

const dispatchPutGaleriePicture = (
    dispatch: Dispatch<Store.Action>,
    frameId: string,
    galeriePictureId: string
) => {
    dispatch(
        apiRequest({
            meta: {
                entity: GALERIE_PICTURES,
                method: 'PUT',
                query: { frameId, galeriePictureId },
                url: `${END_POINT.FRAMES}/${frameId}${END_POINT.GALERIE_PICTURES}/${galeriePictureId}`,
            },
            payload: {},
        })
    );
};

export default dispatchPutGaleriePicture;
