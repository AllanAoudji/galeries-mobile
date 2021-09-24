import { LOADING, SET } from '#store/genericActionTypes';

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Action types
// ----------------------------------
// ----------------------------------
// ----------------------------------
const LOADING_UPDATE = `${LOADING} ${SET}`;

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Action creators
// ----------------------------------
// ----------------------------------
// ----------------------------------
export const setLoading: (payload: boolean) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: LOADING_UPDATE,
});

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Reducers
// ----------------------------------
// ----------------------------------
// ----------------------------------
const loadingInitialState: boolean = false;
export const loadingReducer = (
    state = loadingInitialState,
    action: Store.Action
) => {
    switch (action.type) {
        case LOADING_UPDATE:
            return action.payload;
        default:
            return state;
    }
};

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Selectors
// ----------------------------------
// ----------------------------------
// ----------------------------------
export const selectLoading = (state: Store.Reducer) => state.loading;
