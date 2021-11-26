import { combineReducers } from 'redux';

import ticketsLoadingDeleteReducer from './ticketsLoadingDeleteReducer';
import ticketsLoadingPostReducer from './ticketsLoadingPostReducer';

export default combineReducers({
    delete: ticketsLoadingDeleteReducer,
    post: ticketsLoadingPostReducer,
});
