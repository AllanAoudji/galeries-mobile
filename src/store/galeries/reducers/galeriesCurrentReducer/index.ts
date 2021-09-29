import {
    GALERIES_CURRENT_RESET,
    GALERIES_CURRENT_UPDATE,
} from '#store/galeries/actionTypes';

const initialState: string | null = null;
const galeriesCurrentReducer = (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case GALERIES_CURRENT_RESET:
            return initialState;
        case GALERIES_CURRENT_UPDATE:
            if (typeof action.payload === 'string') return action.payload;
            return state;
        default:
            return state;
    }
};

export default galeriesCurrentReducer;
