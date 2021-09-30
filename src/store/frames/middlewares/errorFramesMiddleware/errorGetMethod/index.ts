import { Dispatch } from 'redux';

import {
    dispatchErrorNotification,
    dispatchUpdateGalerieFrames,
} from '#store/dispatchers';
import { updateFramesStatus } from '#store/frames/actionCreators';
import { getGalerie } from '#store/getters';

const errorGetMethod = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    const galerieId = action.meta.query
        ? action.meta.query.galerieId
        : undefined;

    if (galerieId) {
        const galerie = getGalerie(getState, galerieId);
        if (galerie)
            dispatchUpdateGalerieFrames(dispatch, getState, galerie, {
                status: 'ERROR',
            });
    } else dispatch(updateFramesStatus('ERROR'));

    dispatchErrorNotification(dispatch, action);
};

export default errorGetMethod;
