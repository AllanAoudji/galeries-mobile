import { Dispatch } from 'redux';

import { dispatchErrorNotification } from '#store/dispatchers';
import { updateUsersLoadingDelete } from '#store/users/actionCreators';

const errorDeleteMethod = (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => {
    dispatch(updateUsersLoadingDelete('ERROR'));
    dispatchErrorNotification(dispatch, action);
};

export default errorDeleteMethod;
