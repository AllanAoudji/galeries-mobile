import { combineReducers } from 'redux';

import galeriesStatusIdReducer from './galeriesStatusIdReducer';
import galeriesStatusNameReducer from './galeriesStatusNameReducer';

export default combineReducers({
    id: galeriesStatusIdReducer,
    name: galeriesStatusNameReducer,
});
