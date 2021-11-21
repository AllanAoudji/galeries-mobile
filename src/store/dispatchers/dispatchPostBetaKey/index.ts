import { Dispatch } from 'redux';

import { apiRequest } from '#store/api/actionCreators';
import { END_POINT } from '#helpers/constants';
import { BETA_KEYS } from '#store/genericActionTypes';

const dispatchPostBetaKey = (
    dispatch: Dispatch<Store.Action>,
    payload: { email?: string }
) => {
    dispatch(
        apiRequest({
            meta: {
                entity: BETA_KEYS,
                method: 'POST',
                url: `${END_POINT.BETA_KEYS}`,
            },
            payload,
        })
    );
};

export default dispatchPostBetaKey;
