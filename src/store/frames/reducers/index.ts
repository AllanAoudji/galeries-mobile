import { combineReducers } from 'redux';

import framesAllIdsReducer from './framesAllIdsReducer';
import framesByIdReducer from './framesByIdReducer';
import framesCurrentReducer from './framesCurrentReducer';
import framesEndReducer from './framesEndReducer';
import framesFieldsErrorReducer from './framesFieldsErrorReducer';
import framesLoadingReducers from './framesLoadingReducers';
import framesPreviousReducer from './framesPreviousReducer';
import framesStatusReducer from './framesStatusReducer';

// eslint-disable-next-line import/prefer-default-export
export const framesReducer = combineReducers({
    allIds: framesAllIdsReducer,
    byId: framesByIdReducer,
    current: framesCurrentReducer,
    end: framesEndReducer,
    fieldsError: framesFieldsErrorReducer,
    loading: framesLoadingReducers,
    previous: framesPreviousReducer,
    status: framesStatusReducer,
});
