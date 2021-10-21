import { combineReducers } from 'redux';

import invitationsLoadingDeleteReducer from './invitationsLoadingDeleteReducer';
import invitationsLoadingPostReducer from './invitationsLoadingPostReducer';

export default combineReducers({
    delete: invitationsLoadingDeleteReducer,
    post: invitationsLoadingPostReducer,
});
