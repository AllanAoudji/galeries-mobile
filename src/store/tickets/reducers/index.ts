import { combineReducers } from 'redux';

import ticketsAllIdsReducer from './ticketsAllIdsReducer';
import ticketsByIdReducer from './ticketsByIdReducer';
import ticketsCurrentReducer from './ticketsCurrentReducer';
import ticketsEndReducer from './ticketsEndReducer';
import ticketsFieldsErrorReducer from './ticketsFieldsErrorReducer';
import ticketsLoadingReducer from './ticketsLoadingReducer';
import ticketsPreviousReducer from './ticketsPreviousReducer';
import ticketsStatusReducer from './ticketsStatusReducer';

// eslint-disable-next-line import/prefer-default-export
export const ticketsReducer = combineReducers({
    allIds: ticketsAllIdsReducer,
    byId: ticketsByIdReducer,
    current: ticketsCurrentReducer,
    end: ticketsEndReducer,
    fieldsError: ticketsFieldsErrorReducer,
    loading: ticketsLoadingReducer,
    previous: ticketsPreviousReducer,
    status: ticketsStatusReducer,
});
