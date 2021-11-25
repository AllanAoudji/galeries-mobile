import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api/actionCreators';
import { TICKETS } from '#store/genericActionTypes';

const dispatchPostGalerie = (
    dispatch: Dispatch<Store.Action>,
    payload: {
        body: string;
        header: string;
    }
) => {
    dispatch(
        apiRequest({
            meta: {
                entity: TICKETS,
                method: 'POST',
                url: END_POINT.TICKETS,
            },
            payload,
        })
    );
};

export default dispatchPostGalerie;
