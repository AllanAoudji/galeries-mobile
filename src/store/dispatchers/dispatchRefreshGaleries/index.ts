import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api/actionCreators';
import { GALERIES } from '#store/genericActionTypes';

const dispatchRefreshGaleries = (
    dispatch: Dispatch<Store.Action>,
    name: string
) => {
    const query = `?name=${name}`;
    dispatch(
        apiRequest({
            meta: {
                query: { name },
                entity: GALERIES,
                method: 'GET',
                refresh: true,
                url: `${END_POINT.GALERIES}${query}`,
            },
            payload: {},
        })
    );
};

export default dispatchRefreshGaleries;
