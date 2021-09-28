import { FRAMES_END_RESET, FRAMES_END_UPDATE } from '#store/frames';

const initialState: boolean = false;
const framesEndReducer = (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case FRAMES_END_RESET:
            return initialState;
        case FRAMES_END_UPDATE:
            if (typeof action.payload === 'boolean') return action.payload;
            return state;
        default:
            return state;
    }
};

export default framesEndReducer;
