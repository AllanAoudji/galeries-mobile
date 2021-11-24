import { Dispatch } from 'redux';

import { END_POINT } from '#helpers/constants';
import { apiRequest } from '#store/api/actionCreators';
import { BETA_KEYS } from '#store/genericActionTypes';

const dispatchGetBetaKeys = (dispatch: Dispatch<Store.Action>) => {
    const query = '?me=false&';

    dispatch(
        apiRequest({
            meta: {
                entity: BETA_KEYS,
                method: 'GET',
                url: `${END_POINT.BETA_KEYS}${query}`,
            },
            payload: {},
        })
    );
};

export default dispatchGetBetaKeys;
