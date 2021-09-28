import { Dispatch } from 'redux';

import { updateNotification } from '#store/notification';

const dispatchSuccessNotification: (
    dispatch: Dispatch<Store.Action>,
    text: string
) => void = (dispatch, text) => {
    dispatch(
        updateNotification({
            status: 'success',
            text,
        })
    );
};

export default dispatchSuccessNotification;
