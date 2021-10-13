import { combineReducers } from 'redux';

import galeriePicturesAllIdReducer from './galeriePicturesAllIdReducer';
import galeriePicturesByIdReducer from './galeriePicturesByIdReducer';
import galeriePicturesIdReducer from './galeriePicturesIdReducer';
import galeriePicturesLoadingReducer from './galeriePicturesLoadingReducer';
import galeriePicturesStatusReducer from './galeriePicturesStatusReducer';

// eslint-disable-next-line import/prefer-default-export
export const galeriePicturesReducer = combineReducers({
    allIds: galeriePicturesAllIdReducer,
    byId: galeriePicturesByIdReducer,
    id: galeriePicturesIdReducer,
    loading: galeriePicturesLoadingReducer,
    status: galeriePicturesStatusReducer,
});
