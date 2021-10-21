import { Dispatch } from 'redux';

import { dispatchErrorNotification } from '#store/dispatchers';
import {
    updateFramesStatus,
    updateGalerieFramesStatus,
} from '#store/frames/actionCreators';

const errorGetMethod = (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => {
    const galerieId = action.meta.query
        ? action.meta.query.galerieId
        : undefined;

    if (galerieId) dispatch(updateGalerieFramesStatus(galerieId, 'ERROR'));
    else dispatch(updateFramesStatus('ERROR'));
    dispatchErrorNotification(dispatch, action);
};

export default errorGetMethod;
