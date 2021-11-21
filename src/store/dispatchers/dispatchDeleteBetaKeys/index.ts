import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api/actionCreators';
import { BETA_KEYS } from '#store/genericActionTypes';

const dispatchDeleteBetaKeys = (
    dispatch: Dispatch<Store.Action>,
    betaKeyId: string
) => {
    dispatch(
        apiRequest({
            meta: {
                entity: BETA_KEYS,
                query: { betaKeyId },
                method: 'DELETE',
                url: `${END_POINT.BETA_KEYS}/${betaKeyId}`,
            },
            payload: {},
        })
    );
};

export default dispatchDeleteBetaKeys;
