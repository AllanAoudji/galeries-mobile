import { checkIfAllIds } from '#store/checkers';
import {
    FRAMES_ALL_IDS_REMOVE,
    FRAMES_ALL_IDS_RESET,
    FRAMES_ALL_IDS_SET,
} from '#store/frames/actionTypes';

const initialState: string[] = [];
const framesAllIdsReducer = (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case FRAMES_ALL_IDS_REMOVE:
            if (typeof action.payload === 'string')
                return state.filter((userId) => userId !== action.payload);
            return state;
        case FRAMES_ALL_IDS_RESET:
            return initialState;
        case FRAMES_ALL_IDS_SET:
            if (checkIfAllIds(action.payload)) return action.payload;
            return state;
        default:
            return state;
    }
};

export default framesAllIdsReducer;
