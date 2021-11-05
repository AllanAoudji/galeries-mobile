import { Dispatch } from 'redux';

import { dispatchErrorNotification } from '#store/dispatchers';
import { updateGalerieBlackListsStatus } from '#store/galerieBlackLists/actionCreators';

const errorGetMethod = (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => {
    const galerieId = action.meta.query
        ? action.meta.query.galerieId
        : undefined;

    if (galerieId) dispatch(updateGalerieBlackListsStatus(galerieId, 'ERROR'));
    dispatchErrorNotification(dispatch, action);
};

export default errorGetMethod;
