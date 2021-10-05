import { checkIfStatus } from '#store/checkers';
import {
    FRAMES_STATUS_RESET,
    FRAMES_STATUS_UPDATE,
} from '#store/frames/actionTypes';

const initialState: { [key: string]: Store.Status } = {};
const framesStatusReducer = (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case FRAMES_STATUS_RESET:
            return initialState;
        case FRAMES_STATUS_UPDATE:
            if (!checkIfStatus(action.payload)) return state;
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

export default framesStatusReducer;
