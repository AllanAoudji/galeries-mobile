import {
    GALERIES_PREVIOUS_RESET,
    GALERIES_PREVIOUS_UPDATE,
} from '#store/galeries/actionTypes';

const initialState: { [key: string]: string } = {};
const galeriesPreviousReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case GALERIES_PREVIOUS_RESET:
            return initialState;
        case GALERIES_PREVIOUS_UPDATE:
            if (
                action.meta.query &&
                action.meta.query.name &&
                typeof action.payload === 'string'
            )
                return {
                    ...state,
                    [action.meta.query.name]: action.payload,
                };
            return state;
        default:
            return state;
    }
};

export default galeriesPreviousReducer;
