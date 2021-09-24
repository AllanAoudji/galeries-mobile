// ----------------------------------

import { combineReducers } from 'redux';

// Action types.
const UI: Store.Entity = '[UI]';
const UI_CURRENT_FRAME_ID_SET = `${UI}/currentFrameId Set`;
const UI_CURRENT_GALERIE_ID_SET = `${UI}/currentGalerieId Set`;
const UI_FILTER_GALERIES_NAME_SET = `${UI}/filterGaleriesName Set`;

// ----------------------------------
// Actions.
export const setUiCurrentFrameId: (currentFrameId: string) => Store.Action = (
    currentFrameId
) => ({
    meta: {},
    payload: { currentFrameId },
    type: UI_CURRENT_FRAME_ID_SET,
});
export const setUiCurrentGalerieId: (currentGalerieId: string) => Store.Action =
    (currentGalerieId) => ({
        meta: {},
        payload: { currentGalerieId },
        type: UI_CURRENT_GALERIE_ID_SET,
    });
export const setUiFilterGaleriesName: (
    filterGaleriesName: string
) => Store.Action = (filterGaleriesName) => ({
    meta: {},
    payload: { filterGaleriesName },
    type: UI_FILTER_GALERIES_NAME_SET,
});

// ----------------------------------
// Reducers.
const currentFrameIdInitialState: string | null = null;
const currentFrameIdReducer = (
    state = currentFrameIdInitialState,
    action: Store.Action
) => {
    switch (action.type) {
        case UI_CURRENT_FRAME_ID_SET:
            return action.payload;
        default:
            return state;
    }
};
const currentGalerieIdInitialState: string | null = null;
const currentGalerieIdReducer = (
    state = currentGalerieIdInitialState,
    action: Store.Action
) => {
    switch (action.type) {
        case UI_CURRENT_GALERIE_ID_SET:
            return action.payload;
        default:
            return state;
    }
};
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
// Combined reducers.
export const uiReducer = combineReducers({
    currentFrameId: currentFrameIdReducer,
    currentGalerieId: currentGalerieIdReducer,
    filterGaleriesName: filterGaleriesNameReducer,
});
