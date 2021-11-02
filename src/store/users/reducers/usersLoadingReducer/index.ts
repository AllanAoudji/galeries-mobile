import { combineReducers } from 'redux';

import usersLoadingDeleteReducer from './usersLoadingDeleteReducer';

export default combineReducers({
    delete: usersLoadingDeleteReducer,
});
