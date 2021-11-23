import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api/actionCreators';
import { SEND_BETA_KEY } from '#store/genericActionTypes';

const dispatchSendBetaKey = (
    dispatch: Dispatch<Store.Action>,
    betaKeyId: string
) => {
    dispatch(
        apiRequest({
            meta: {
                entity: SEND_BETA_KEY,
                method: 'POST',
                query: { betaKeyId },
                url: `${END_POINT.BETA_KEYS}/${betaKeyId}${END_POINT.SEND}`,
            },
            payload: {},
        })
    );
};

export default dispatchSendBetaKey;
