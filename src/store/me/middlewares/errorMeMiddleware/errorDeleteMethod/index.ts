import { Dispatch } from 'redux';

import { dispatchErrorNotification } from '#store/dispatchers';
import { updateMeLoadingDelete } from '#store/me/actionCreators';

const errorDeleteMethod = (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => {
    dispatch(updateMeLoadingDelete('ERROR'));
    dispatchErrorNotification(dispatch, action);
};

export default errorDeleteMethod;
