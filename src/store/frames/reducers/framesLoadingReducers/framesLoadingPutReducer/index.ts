import { checkIfStatus } from '#store/checkers';
import {
    FRAMES_LOADING_PUT_RESET,
    FRAMES_LOADING_PUT_UPDATE,
} from '#store/frames/actionTypes';

const initialState: Store.Status = 'PENDING';
const framesLoadingPutReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case FRAMES_LOADING_PUT_RESET:
            return initialState;
        case FRAMES_LOADING_PUT_UPDATE:
            if (checkIfStatus(action.payload)) return action.payload;
            return state;
        default:
            return state;
    }
};

export default framesLoadingPutReducer;
