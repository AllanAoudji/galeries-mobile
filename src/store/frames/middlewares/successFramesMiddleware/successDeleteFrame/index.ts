import { Dispatch } from 'redux';

import {
    removeFramesAllIds,
    removeFramesById,
    removeGalerieFramesAllIds,
    resetFramesCurrent,
    updateFramesLoadingDelete,
} from '#store/frames/actionCreators';

const successDeleteFrame = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    if (typeof action.payload.data !== 'object') return;
    const { frameId } = action.payload.data;
    if (typeof frameId !== 'string') return;
    const frame = getState().frames.byId[frameId];
    if (!frame) return;

    dispatch(removeFramesById(frameId));
    dispatch(resetFramesCurrent());
    dispatch(removeFramesAllIds(frameId));
    dispatch(removeGalerieFramesAllIds(frame.galerieId, frameId));
    dispatch(updateFramesLoadingDelete('SUCCESS'));
};

export default successDeleteFrame;
