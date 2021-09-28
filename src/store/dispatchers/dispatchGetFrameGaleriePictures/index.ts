import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api';
import { GALERIE_PICTURES } from '#store/genericActionTypes';

const dispatchGetFrameGaleriePictures = (
    dispatch: Dispatch<Store.Action>,
    frameId: string
) => {
    dispatch(
        apiRequest({
            meta: {
                entity: GALERIE_PICTURES,
                method: 'GET',
                query: { frameId },
                url: `${END_POINT.FRAMES}/${frameId}${END_POINT.GALERIE_PICTURES}`,
            },
            payload: {},
        })
    );
};

export default dispatchGetFrameGaleriePictures;
