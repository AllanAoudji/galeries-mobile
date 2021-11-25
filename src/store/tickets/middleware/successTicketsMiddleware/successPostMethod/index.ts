import { Dispatch } from 'redux';

import { updateTicketsStatus } from '#store/tickets/actionCreators';
import { updateNotification } from '#store/notification/actionCreators';

const successPostMethod = (dispatch: Dispatch<Store.Action>) => {
    dispatch(updateTicketsStatus('SUCCESS'));
    dispatch(
        updateNotification({
            status: 'success',
            text: "you're ticket has been send successfully",
        })
    );
};

export default successPostMethod;
