import { Dispatch } from 'redux';

import { updateCommentsLoadingDelete } from '#store/comments/actionCreators';
import { dispatchErrorNotification } from '#store/dispatchers';

const errorDeleteMethod = (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => {
    dispatch(updateCommentsLoadingDelete('ERROR'));
    dispatchErrorNotification(dispatch, action);
};

export default errorDeleteMethod;
