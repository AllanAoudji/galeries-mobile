import { combineReducers } from 'redux';

import reportsLoadingReducers from './reportsLoadingReducers';

// eslint-disable-next-line import/prefer-default-export
export const reportsReducer = combineReducers({
    loading: reportsLoadingReducers,
});
