import {
    FRAMES_PREVIOUS_RESET,
    FRAMES_PREVIOUS_UPDATE,
} from '#store/frames/actionTypes';

const initialState: { [key: string]: string } = {};
const framesPreviousReducer = (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case FRAMES_PREVIOUS_RESET:
            return initialState;
        case FRAMES_PREVIOUS_UPDATE:
            if (typeof action.payload !== 'string') return state;
            if (action.meta.query && action.meta.query.galerieId) {
                return {
                    ...state,
                    [action.meta.query.galerieId]: action.payload,
                };
            }
            return {
                ...state,
                '': action.payload,
            };
        default:
            return state;
    }
};

export default framesPreviousReducer;
