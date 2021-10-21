import { Dispatch } from 'redux';

import { dispatchErrorNotification } from '#store/dispatchers';
import { updateInvitationsLoadingDelete } from '#store/invitations/actionCreators';

const errorDeleteMethod = (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => {
    dispatch(updateInvitationsLoadingDelete('ERROR'));
    dispatchErrorNotification(dispatch, action);
};

export default errorDeleteMethod;
