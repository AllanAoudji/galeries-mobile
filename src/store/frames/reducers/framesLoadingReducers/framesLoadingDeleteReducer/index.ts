import { checkIfStatus } from '#store/checkers';
import {
    FRAMES_LOADING_DELETE_RESET,
    FRAMES_LOADING_DELETE_UPDATE,
} from '#store/frames/actionTypes';

const initialState: Store.Status = 'PENDING';
const framesLoadingDeleteReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case FRAMES_LOADING_DELETE_RESET:
            return initialState;
        case FRAMES_LOADING_DELETE_UPDATE:
            if (checkIfStatus(action.payload)) return action.payload;
            return state;
        default:
            return state;
    }
};

export default framesLoadingDeleteReducer;
