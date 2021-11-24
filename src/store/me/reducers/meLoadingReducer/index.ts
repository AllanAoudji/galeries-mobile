import { combineReducers } from 'redux';

import meLoadingPutReducer from './meLoadingPutReducer';

export default combineReducers({
    put: meLoadingPutReducer,
});
