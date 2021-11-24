import { combineReducers } from 'redux';

import meFieldsErrorReducer from './meFieldsErrorReducer';
import meIdReducer from './meIdReducer';
import meLoadingReducer from './meLoadingReducer';
import meStatusReducer from './meStatusReducer';

// eslint-disable-next-line import/prefer-default-export
export const meReducer = combineReducers({
    fieldsError: meFieldsErrorReducer,
    id: meIdReducer,
    loading: meLoadingReducer,
    status: meStatusReducer,
});
