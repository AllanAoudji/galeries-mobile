import { Dispatch } from 'redux';

import { updateFramesLoadingPost } from '#store/frames/actionCreators';

const errorPostMethod = (dispatch: Dispatch<Store.Action>) => {
    dispatch(updateFramesLoadingPost('ERROR'));
};

export default errorPostMethod;
