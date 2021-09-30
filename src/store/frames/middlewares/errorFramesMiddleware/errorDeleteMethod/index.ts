import { Dispatch } from 'redux';

import { dispatchErrorNotification } from '#store/dispatchers';
import { updateFramesLoadingDelete } from '#store/frames/actionCreators';

const errorDeleteMethod = (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => {
    dispatch(updateFramesLoadingDelete('ERROR'));
    dispatchErrorNotification(dispatch, action);
};

export default errorDeleteMethod;
