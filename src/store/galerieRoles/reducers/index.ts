import { combineReducers } from 'redux';

import galerieRolesAllIdsReducer from './galerieRolesAllIdsReducer';

// eslint-disable-next-line import/prefer-default-export
export const galerieRolesReducer = combineReducers({
    allIds: galerieRolesAllIdsReducer,
});
