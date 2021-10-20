import { Dispatch } from 'redux';

import {
    removeFramesAllIds,
    removeFramesById,
    removeGalerieFramesAllIds,
    resetFramesCurrent,
    updateFramesLoadingDelete,
} from '#store/frames/actionCreators';
import { updateGaleriePicturesId } from '#store/galeriePictures/actionCreators';

const successDeleteFrame = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    if (typeof action.payload.data !== 'object') {
        dispatch(updateFramesLoadingDelete('ERROR'));
        return;
    }
    const { frameId } = action.payload.data;
    if (typeof frameId !== 'string') {
        dispatch(updateFramesLoadingDelete('ERROR'));
        return;
    }
    const frame = getState().frames.byId[frameId];
    if (!frame) {
        dispatch(updateFramesLoadingDelete('ERROR'));
        return;
    }

    const galeriePictures = getState().galeriePictures.allIds[frameId];

    if (galeriePictures.length) {
        galeriePictures.forEach((id) => {
            const galeriePicture = getState().galeriePictures.byId[id];
            if (galeriePicture && galeriePicture.current)
                dispatch(updateGaleriePicturesId(frame.galerieId, null));
        });
    }

    dispatch(removeFramesAllIds(frameId));
    dispatch(removeGalerieFramesAllIds(frame.galerieId, frameId));
    dispatch(resetFramesCurrent());
    dispatch(removeFramesById(frameId));
    dispatch(updateFramesLoadingDelete('SUCCESS'));
};

export default successDeleteFrame;
