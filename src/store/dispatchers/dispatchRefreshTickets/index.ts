import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api';
import { TICKETS } from '#store/genericActionTypes';

const dispatchRefreshTickets = (dispatch: Dispatch<Store.Action>) => {
    dispatch(
        apiRequest({
            meta: {
                entity: TICKETS,
                method: 'GET',
                refresh: true,
                url: `${END_POINT.TICKETS}`,
            },
            payload: {},
        })
    );
};

export default dispatchRefreshTickets;
