import { combineReducers } from 'redux';

import galeriePicturesLoadingPutReducer from './galeriePicturesLoadingPutReducer';

export default combineReducers({
    put: galeriePicturesLoadingPutReducer,
});
