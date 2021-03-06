import { Dispatch } from 'redux';

import {
    updateFramesById,
    updateFramesLoadingPut,
} from '#store/frames/actionCreators';

const successPutFrame = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    if (typeof action.payload.data !== 'object') return;
    const { description, frameId } = action.payload.data;
    if (typeof description !== 'string' || typeof frameId !== 'string') return;

    const frame = getState().frames.byId[frameId];
    if (!frame) return;

    const newFrame = { ...frame, description };
    dispatch(updateFramesById(newFrame));

    dispatch(updateFramesLoadingPut('SUCCESS'));
};

export default successPutFrame;
