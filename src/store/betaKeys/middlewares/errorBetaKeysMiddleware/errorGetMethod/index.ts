import { Dispatch } from 'redux';

import { updateBetaKeysStatus } from '#store/betaKeys/actionCreators';

const errorGetMethod = (dispatch: Dispatch<Store.Action>) => {
    dispatch(updateBetaKeysStatus('ERROR'));
    // TODO: if error = model not found
    // and action.meta.query.betaKeyId, remove betakey
};

export default errorGetMethod;
