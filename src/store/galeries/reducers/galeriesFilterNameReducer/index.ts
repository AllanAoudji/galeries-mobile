import {
    GALERIES_FIELDS_ERROR_RESET,
    GALERIES_FIELDS_ERROR_UPDATE,
} from '#store/galeries/actionTypes';

const intialState: string = '';
const galeriesFilterNameReducer = (
    state = intialState,
    action: Store.Action
) => {
    switch (action.type) {
        case GALERIES_FIELDS_ERROR_RESET:
            return intialState;
        case GALERIES_FIELDS_ERROR_UPDATE:
            if (typeof action.payload === 'string') return action.payload;
            return state;
        default:
            return state;
    }
};

export default galeriesFilterNameReducer;
