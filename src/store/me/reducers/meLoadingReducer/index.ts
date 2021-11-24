import { combineReducers } from 'redux';

import meLoadingDeleteReducer from './meLoadingDeleteReducer';
import meLoadingPutReducer from './meLoadingPutReducer';

export default combineReducers({
    delete: meLoadingDeleteReducer,
    put: meLoadingPutReducer,
});
