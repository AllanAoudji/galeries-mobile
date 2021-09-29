import { checkIfStatus } from '#store/checkers';
import {
    SIGNIN_STATUS_RESET,
    SIGNIN_STATUS_UPDATE,
} from '#store/signin/actionTypes';

const initialState: Store.Status = 'PENDING';
const signinStatusReducer = (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case SIGNIN_STATUS_RESET:
            return initialState;
        case SIGNIN_STATUS_UPDATE:
            if (checkIfStatus(action.payload)) return action.payload;
            return state;
        default:
            return state;
    }
};

export default signinStatusReducer;
