import { combineReducers } from 'redux';

// Action types.
const UI: Store.Entity = '[UI]';
const UI_FILTER_GALERIES_NAME_SET = `${UI}/filterGaleriesName Set`;

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Actions
// ----------------------------------
// ----------------------------------
// ----------------------------------
export const setUiFilterGaleriesName: (
    filterGaleriesName: string
) => Store.Action = (filterGaleriesName) => ({
    meta: {},
    payload: { filterGaleriesName },
    type: UI_FILTER_GALERIES_NAME_SET,
});

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Reducers
// ----------------------------------
// ----------------------------------
// ----------------------------------
const filterGaleriesNameInitialState: string = '';
const filterGaleriesNameReducer = (
    state = filterGaleriesNameInitialState,
    action: Store.Action
) => {
    switch (action.type) {
        case UI_FILTER_GALERIES_NAME_SET:
            return action.payload;
        default:
            return state;
    }
};

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Combined reducers
// ----------------------------------
// ----------------------------------
// ----------------------------------
export const uiReducer = combineReducers({
    filterGaleriesName: filterGaleriesNameReducer,
});

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Selector
// ----------------------------------
// ----------------------------------
// ----------------------------------
export const selectFilterGaleriesName = (state: Store.Reducer) =>
    state.ui.filterGaleriesName;
