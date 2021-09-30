import { Dispatch } from 'redux';

import { dispatchDeleteGalerieFrame } from '#store/dispatchers';
import {
    removeFramesAllIds,
    removeFramesById,
    resetFramesCurrent,
    updateFramesLoadingDelete,
} from '#store/frames/actionCreators';
import { getFrame, getGalerie } from '#store/getters';

const successDeleteFrame = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    if (typeof action.payload.data !== 'object') return;
    const { frameId } = action.payload.data;
    if (typeof frameId !== 'string') return;
    const frame = getFrame(getState, frameId);
    if (!frame) return;

    dispatch(removeFramesById(frameId));
    dispatch(resetFramesCurrent());
    dispatch(removeFramesAllIds(frameId));

    const galerie = getGalerie(getState, frame.galerieId);
    if (galerie) dispatchDeleteGalerieFrame(dispatch, galerie, frameId);

    dispatch(updateFramesLoadingDelete('SUCCESS'));
};

export default successDeleteFrame;
