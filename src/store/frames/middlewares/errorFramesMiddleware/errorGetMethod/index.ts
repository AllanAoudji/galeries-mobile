import { Dispatch } from 'redux';

import {
    removeFramesAllIds,
    removeGalerieFramesAllIds,
    resetFramesCurrent,
    updateFramesStatus,
    updateGalerieFramesStatus,
} from '#store/frames/actionCreators';

const errorGetMethod = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    const frameId = action.meta.query ? action.meta.query.frameId : undefined;
    const galerieId = action.meta.query
        ? action.meta.query.galerieId
        : undefined;

    if (frameId) {
        const frame = getState().frames.byId[frameId];
        if (frame) {
            dispatch(removeFramesAllIds(frameId));
            dispatch(removeGalerieFramesAllIds(frame.galerieId, frameId));
            const meId = getState().me.id;
            if (meId === frame.userId)
                dispatch(removeGalerieFramesAllIds(meId, frameId));
            const { current } = getState().frames;
            if (current === frameId) dispatch(resetFramesCurrent());
        }
    } else if (galerieId)
        dispatch(updateGalerieFramesStatus(galerieId, 'ERROR'));
    else dispatch(updateFramesStatus('ERROR'));
};

export default errorGetMethod;
