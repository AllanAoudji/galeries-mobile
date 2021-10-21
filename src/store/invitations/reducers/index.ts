import { combineReducers } from 'redux';

import invitationsAllIdsReducer from './invitationsAllIdsReducer';
import invitationsByIdReducer from './invitationsByIdReducer';
import invitationsCurrentReducer from './invitationsCurrentReducer';
import invitationsEndReducer from './invitationsEndReducer';
import invitationsLoadingReducers from './invitationsLoadingReducers';
import invitationsPreviousReducer from './invitationsPreviousReducer';
import invitationsStatusReducer from './invitationsStatusReducer';

// eslint-disable-next-line import/prefer-default-export
export const invitationsReducer = combineReducers({
    allIds: invitationsAllIdsReducer,
    byId: invitationsByIdReducer,
    current: invitationsCurrentReducer,
    end: invitationsEndReducer,
    loading: invitationsLoadingReducers,
    previous: invitationsPreviousReducer,
    status: invitationsStatusReducer,
});
