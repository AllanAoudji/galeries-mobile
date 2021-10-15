import { combineReducers } from 'redux';

import galeriesAllIdsReducer from './galeriesAllIdsReducer';
import galeriesByIdReducer from './galeriesByIdReducer';
import galeriesCurrentReducer from './galeriesCurrentReducer';
import galeriesEndReducer from './galeriesEndReducer';
import galeriesFieldsErrorReducer from './galeriesFieldsErrorReducer';
import galeriesFilterNameReducer from './galeriesFilterNameReducer';
import galeriesLoadingReducer from './galeriesLoadingReducer';
import galeriesPreviousReducer from './galeriesPreviousReducer';
import galeriesStatusReducer from './galeriesStatusReducer';

// TODO: loading reducers

// eslint-disable-next-line import/prefer-default-export
export const galeriesReducer = combineReducers({
    allIds: galeriesAllIdsReducer,
    byId: galeriesByIdReducer,
    current: galeriesCurrentReducer,
    end: galeriesEndReducer,
    fieldsError: galeriesFieldsErrorReducer,
    filterName: galeriesFilterNameReducer,
    loading: galeriesLoadingReducer,
    previous: galeriesPreviousReducer,
    status: galeriesStatusReducer,
});
