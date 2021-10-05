import { Dispatch } from 'redux';

import { dispatchErrorNotification } from '#store/dispatchers';
import { updateCommentsStatus } from '#store/comments/actionCreators';

const errorGetMethod = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    const frameId = action.payload.query
        ? action.payload.query.frameId
        : undefined;
    const galerieId = action.payload.query
        ? action.payload.query.galerieId
        : undefined;

    if (frameId) dispatch(updateCommentsStatus(frameId, 'ERROR'));
    else if (galerieId) dispatch(updateCommentsStatus(galerieId, 'ERROR'));
    dispatchErrorNotification(dispatch, action);
};

export default errorGetMethod;
