import { Dispatch } from 'redux';

import { updateCommentsLoadingPost } from '#store/comments/actionCreators';
import { dispatchErrorNotification } from '#store/dispatchers';

const errorPostMethod = (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => {
    dispatch(updateCommentsLoadingPost('ERROR'));
    dispatchErrorNotification(dispatch, action);
};

export default errorPostMethod;
