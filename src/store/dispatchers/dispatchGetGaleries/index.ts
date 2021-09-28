import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api';
import { GALERIES } from '#store/genericActionTypes';

const dispatchGetGaleries = (
    dispatch: Dispatch<Store.Action>,
    name: string,
    query: string
) => {
    dispatch(
        apiRequest({
            meta: {
                query: { name },
                entity: GALERIES,
                method: 'GET',
                url: `${END_POINT.GALERIES}${query}`,
            },
            payload: {},
        })
    );
};

export default dispatchGetGaleries;
