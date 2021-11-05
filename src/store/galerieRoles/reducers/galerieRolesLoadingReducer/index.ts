import { combineReducers } from 'redux';

import galerieRolesLoadingPutReducer from './galerieRolesLoadingPutReducer';

export default combineReducers({
    put: galerieRolesLoadingPutReducer,
});
