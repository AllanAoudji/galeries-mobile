import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api';
import { TICKETS } from '#store/genericActionTypes';

const dispatchGetTickets = (
    dispatch: Dispatch<Store.Action>,
    previous?: string
) => {
    let query = '?';
    if (previous) query = `${query}previous=${previous}`;
    dispatch(
        apiRequest({
            meta: {
                entity: TICKETS,
                method: 'GET',
                url: `${END_POINT.TICKETS}${query}`,
            },
            payload: {},
        })
    );
};

export default dispatchGetTickets;
