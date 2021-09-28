import { combineReducers } from 'redux';

import framesLoadingDeleteReducer from './framesLoadingDeleteReducer';
import framesLoadingPostReducer from './framesLoadingPostReducer';
import framesLoadingPutReducer from './framesLoadingPutReducer';

export default combineReducers({
    delete: framesLoadingDeleteReducer,
    post: framesLoadingPostReducer,
    put: framesLoadingPutReducer,
});
