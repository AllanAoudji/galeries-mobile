import { combineReducers } from 'redux';

import meIdReducer from './meIdReducer';
import meStatusReducer from './meStatusReducer';

// eslint-disable-next-line import/prefer-default-export
export const meReducer = combineReducers({
    id: meIdReducer,
    status: meStatusReducer,
});
