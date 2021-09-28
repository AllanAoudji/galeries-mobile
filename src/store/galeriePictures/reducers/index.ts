import { combineReducers } from 'redux';
import galeriePicturesByIdReducer from './galeriePicturesByIdReducer';

// eslint-disable-next-line import/prefer-default-export
export const galeriePicturesReducer = combineReducers({
    byId: galeriePicturesByIdReducer,
});
