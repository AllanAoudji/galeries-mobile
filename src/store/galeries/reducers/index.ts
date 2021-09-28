import { combineReducers } from 'redux';

import galeriesAllIdsReducer from './galeriesAllIdsReducer';
import galeriesByIdReducer from './galeriesByIdReducer';
import galeriesCurrentReducer from './galeriesCurrentReducer';
import galeriesEndReducer from './galeriesEndReducer';
import galeriesFieldsErrorReducer from './galeriesFieldsErrorReducer';
import galeriesFilterNameReducer from './galeriesFilterNameReducer';
import galeriesPreviousReducer from './galeriesPreviousReducer';
import galeriesStatusReducer from './galeriesStatusReducer';

// eslint-disable-next-line import/prefer-default-export
export const galeriesReducer = combineReducers({
    allIds: galeriesAllIdsReducer,
    byId: galeriesByIdReducer,
    current: galeriesCurrentReducer,
    end: galeriesEndReducer,
    fieldsError: galeriesFieldsErrorReducer,
    fileterName: galeriesFilterNameReducer,
    previous: galeriesPreviousReducer,
    status: galeriesStatusReducer,
});
