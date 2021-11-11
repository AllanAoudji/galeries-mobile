import { Dispatch } from 'redux';

import { apiRequest } from '#store/api';
import { REPORTS } from '#store/genericActionTypes';
import { END_POINT } from '#helpers/constants';

const dispatchPostProfilePictureIdReports = (
    dispatch: Dispatch<Store.Action>,
    profilePictureId: string,
    payload: { reason: string }
) => {
    dispatch(
        apiRequest({
            meta: {
                entity: REPORTS,
                method: 'POST',
                query: { profilePictureId },
                url: `${END_POINT.PROFILE_PICTURES}/${profilePictureId}${END_POINT.REPORTS}`,
            },
            payload,
        })
    );
};

export default dispatchPostProfilePictureIdReports;
