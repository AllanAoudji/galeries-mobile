import {
    FRAMES_BY_ID_REMOVE,
    FRAMES_BY_ID_RESET,
    FRAMES_BY_ID_SET,
    FRAMES_BY_ID_UPDATE,
} from '#store/frames/actionTypes';

const initialState: { [key: string]: Store.Models.Frame } = {};
const framesByIdReducer = (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case FRAMES_BY_ID_REMOVE:
            if (typeof action.payload === 'string') {
                const newState = { ...state };
                delete newState[action.payload];
                return { ...newState };
            }
            return state;
        case FRAMES_BY_ID_RESET:
            return initialState;
        case FRAMES_BY_ID_SET:
            if (typeof action.payload === 'object')
                return {
                    ...state,
                    ...action.payload,
                };
            return state;
        case FRAMES_BY_ID_UPDATE:
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

export default framesByIdReducer;
