import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api/actionCreators';
import { BETA_KEYS } from '#store/genericActionTypes';

const dispatchGetBetaKey = (
    dispatch: Dispatch<Store.Action>,
    betaKeyId: string
) => {
    dispatch(
        apiRequest({
            meta: {
                entity: BETA_KEYS,
                method: 'GET',
                query: { betaKeyId },
                url: `${END_POINT.BETA_KEYS}/${betaKeyId}`,
            },
            payload: {},
        })
    );
};

export default dispatchGetBetaKey;
