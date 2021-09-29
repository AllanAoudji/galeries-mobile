import {
    FRAMES_CURRENT_RESET,
    FRAMES_CURRENT_UPDATE,
} from '#store/frames/actionTypes';

const initialState: string | null = null;
const framesCurrentReducer = (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case FRAMES_CURRENT_RESET:
            return initialState;
        case FRAMES_CURRENT_UPDATE:
            if (typeof action.payload === 'string') return action.payload;
            return state;
        default:
            return state;
    }
};

export default framesCurrentReducer;
