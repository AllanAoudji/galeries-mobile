import { combineReducers } from 'redux';

import galerieRolesByIdReducer from './galerieRolesByIdReducer';

// eslint-disable-next-line import/prefer-default-export
export const galerieRolesReducer = combineReducers({
    byId: galerieRolesByIdReducer,
});
