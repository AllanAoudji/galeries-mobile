import {
    FRAMES_PREVIOUS_RESET,
    FRAMES_PREVIOUS_UPDATE,
} from '#store/frames/actionTypes';

const initialState: string = '';
const framesPreviousReducer = (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case FRAMES_PREVIOUS_RESET:
            return initialState;
        case FRAMES_PREVIOUS_UPDATE:
            if (
                typeof action.payload === 'string' ||
                action.payload === undefined
            )
                return action.payload;
            return state;
        default:
            return state;
    }
};

export default framesPreviousReducer;
