import { Dispatch } from 'redux';

import { dispatchErrorNotification } from '#store/dispatchers';
import { updateGalerieBlackListsLoadingPost } from '#store/galerieBlackLists/actionCreators';

const errorPostMethod = (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => {
    dispatchErrorNotification(dispatch, action);
    dispatch(updateGalerieBlackListsLoadingPost('ERROR'));
};

export default errorPostMethod;
