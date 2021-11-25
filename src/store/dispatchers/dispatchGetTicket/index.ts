import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api';
import { TICKETS } from '#store/genericActionTypes';

const dispatchGetTicket = (
    dispatch: Dispatch<Store.Action>,
    ticketId: string
) => {
    dispatch(
        apiRequest({
            meta: {
                entity: TICKETS,
                method: 'GET',
                query: { ticketId },
                url: `${END_POINT.TICKETS}/${ticketId}`,
            },
            payload: {},
        })
    );
};

export default dispatchGetTicket;
