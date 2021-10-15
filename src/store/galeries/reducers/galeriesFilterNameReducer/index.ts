import {
    GALERIES_FILTER_NAME_RESET,
    GALERIES_FILTER_NAME_UPDATE,
} from '#store/galeries/actionTypes';

const intialState: string = '';
const galeriesFilterNameReducer = (
    state = intialState,
    action: Store.Action
) => {
    switch (action.type) {
        case GALERIES_FILTER_NAME_RESET:
            return intialState;
        case GALERIES_FILTER_NAME_UPDATE:
            if (typeof action.payload === 'string') return action.payload;
            return state;
        default:
            return state;
    }
};

export default galeriesFilterNameReducer;
