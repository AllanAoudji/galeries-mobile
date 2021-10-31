import { combineReducers } from 'redux';

import galerieRolesByIdReducer from './galerieRolesByIdReducer';
import galerieRolesLoadingReducer from './galerieRolesLoadingReducer';

// eslint-disable-next-line import/prefer-default-export
export const galerieRolesReducer = combineReducers({
    byId: galerieRolesByIdReducer,
    loading: galerieRolesLoadingReducer,
});
