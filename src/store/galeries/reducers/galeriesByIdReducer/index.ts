import {
    GALERIES_BY_ID_REMOVE,
    GALERIES_BY_ID_RESET,
    GALERIES_BY_ID_SET,
    GALERIES_BY_UD_UPDATE,
} from '#store/galeries';

const initialState: {
    [key: string]: Store.Models.Galerie;
} = {};
const galeriesByIdReducer = (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case GALERIES_BY_ID_REMOVE:
            if (typeof action.payload === 'string') {
                const newState = { ...state };
                delete newState[action.payload];
                return { ...newState };
            }
            return state;
        case GALERIES_BY_ID_RESET:
            return initialState;
        case GALERIES_BY_ID_SET:
            if (typeof action.payload === 'object')
                return {
                    ...state,
                    ...action.payload,
                };
            return state;
        case GALERIES_BY_UD_UPDATE:
            if (typeof action.payload === 'object')
                return {
                    ...state,
                    [action.payload.id]: { ...action.payload },
                };
            return state;
        default:
            return state;
    }
};

export default galeriesByIdReducer;
