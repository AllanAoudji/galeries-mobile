import { combineReducers } from 'redux';

import sendBetaKeyStatusIdReducer from './sendBetaKeyStatusIdReducer';

export default combineReducers({
    id: sendBetaKeyStatusIdReducer,
});
