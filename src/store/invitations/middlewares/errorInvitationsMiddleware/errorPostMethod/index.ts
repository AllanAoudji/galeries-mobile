import { Dispatch } from 'redux';

import { dispatchErrorNotification } from '#store/dispatchers';
import { updateInvitationsLoadingPost } from '#store/invitations/actionCreators';

const errorPostMethod = (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => {
    dispatch(updateInvitationsLoadingPost('ERROR'));
    dispatchErrorNotification(dispatch, action);
};

export default errorPostMethod;
