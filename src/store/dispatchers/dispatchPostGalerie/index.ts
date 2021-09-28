import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api';
import { GALERIES } from '#store/genericActionTypes';

const dispatchPostGalerie = (
    dispatch: Dispatch<Store.Action>,
    payload: {
        description: string;
        name: string;
    }
) => {
    dispatch(
        apiRequest({
            meta: {
                entity: GALERIES,
                method: 'POST',
                url: END_POINT.GALERIES,
            },
            payload,
        })
    );
};

export default dispatchPostGalerie;
