import { combineReducers } from 'redux';

import usersAllIdsReducer from './usersAllIdsReducer';
import usersByIdReducer from './usersByIdReducer';
import usersCurrentReducer from './usersCurrentReducer';
import usersEndReducer from './usersEndReducer';
import usersPreviousReducer from './usersPreviousReducer';
import usersStatusReducer from './usersStatusReducer';

// eslint-disable-next-line import/prefer-default-export
export const usersReducer = combineReducers({
    allIds: usersAllIdsReducer,
    byId: usersByIdReducer,
    current: usersCurrentReducer,
    end: usersEndReducer,
    previous: usersPreviousReducer,
    status: usersStatusReducer,
});
