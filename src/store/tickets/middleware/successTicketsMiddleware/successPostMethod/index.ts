import { Dispatch } from 'redux';

import { updateTicketsLoadingPost } from '#store/tickets/actionCreators';
import { updateNotification } from '#store/notification/actionCreators';

const successPostMethod = (dispatch: Dispatch<Store.Action>) => {
    dispatch(updateTicketsLoadingPost('SUCCESS'));
    dispatch(
        updateNotification({
            status: 'success',
            text: "you're ticket has been send successfully",
        })
    );
};

export default successPostMethod;
