import { Dispatch } from 'redux';

import {
    dispatchErrorNotification,
    dispatchUpdateFrameComments,
} from '#store/dispatchers';
import { getFrame } from '#store/getters';

const errorGetMethod = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    const frameId = action.payload.query
        ? action.payload.query.frameId
        : undefined;
    if (frameId) {
        dispatchErrorNotification(dispatch, action);
        return;
    }
    const frame = getFrame(getState, frameId);
    if (!frame) {
        dispatchErrorNotification(dispatch, action);
        return;
    }

    dispatchUpdateFrameComments(dispatch, frame, {
        status: 'ERROR',
    });
    dispatchErrorNotification(dispatch, action);
};

export default errorGetMethod;
