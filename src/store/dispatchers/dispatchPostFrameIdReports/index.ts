import { Dispatch } from 'redux';

import { apiRequest } from '#store/api';
import { REPORTS } from '#store/genericActionTypes';
import { END_POINT } from '#helpers/constants';

const dispatchPostFrameIdReports = (
    dispatch: Dispatch<Store.Action>,
    frameId: string,
    payload: { reason: string }
) => {
    dispatch(
        apiRequest({
            meta: {
                entity: REPORTS,
                method: 'POST',
                query: { frameId },
                url: `${END_POINT.FRAMES}/${frameId}${END_POINT.REPORTS}`,
            },
            payload,
        })
    );
};

export default dispatchPostFrameIdReports;
