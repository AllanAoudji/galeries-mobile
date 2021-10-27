import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api';
import { GALERIES } from '#store/genericActionTypes';

const dispatchPostGalerieSubscribe = (
    dispatch: Dispatch<Store.Action>,
    payload: { code: string }
) => {
    dispatch(
        apiRequest({
            meta: {
                entity: GALERIES,
                method: 'POST',
                url: `${END_POINT.GALERIES}${END_POINT.SUBSCRIBE}`,
            },
            payload,
        })
    );
};

export default dispatchPostGalerieSubscribe;
