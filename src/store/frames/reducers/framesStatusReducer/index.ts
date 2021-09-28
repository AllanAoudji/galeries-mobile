import { checkIfStatus } from '#store/checkers';
import { FRAMES_STATUS_RESET, FRAMES_STATUS_UPDATE } from '#store/frames';

const initialState: Store.Status = 'PENDING';
const framesStatusReducer = (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case FRAMES_STATUS_RESET:
            return initialState;
        case FRAMES_STATUS_UPDATE:
            if (checkIfStatus(action.payload)) return action.payload;
            return state;
        default:
            return state;
    }
};

export default framesStatusReducer;
