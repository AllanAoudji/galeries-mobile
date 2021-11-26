import { Dispatch } from 'redux';

import resetStore from '#store/resetStore';

import { dispatchErrorNotification } from '#store/dispatchers';

const errorGetMethod = (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => {
    resetStore(dispatch, () => {
        dispatchErrorNotification(dispatch, action);
    });
};

export default errorGetMethod;
