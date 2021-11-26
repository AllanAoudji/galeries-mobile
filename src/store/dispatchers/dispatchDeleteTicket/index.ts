import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api/actionCreators';
import { TICKETS } from '#store/genericActionTypes';

const dispatchDeleteTicket = (
    dispatch: Dispatch<Store.Action>,
    ticketId: string
) => {
    dispatch(
        apiRequest({
            meta: {
                entity: TICKETS,
                method: 'DELETE',
                query: { ticketId },
                url: `${END_POINT.TICKETS}/${ticketId}`,
            },
            payload: {},
        })
    );
};

export default dispatchDeleteTicket;
