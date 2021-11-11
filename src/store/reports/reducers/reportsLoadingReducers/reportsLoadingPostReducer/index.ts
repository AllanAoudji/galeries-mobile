import { checkIfStatus } from '#store/checkers';
import {
    REPORTS_LOADING_POST_RESET,
    REPORTS_LOADING_POST_UPDATE,
} from '#store/reports/actionTypes';

const initialState: Store.Status = 'PENDING';
const reportsLoadingPostReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case REPORTS_LOADING_POST_RESET:
            return initialState;
        case REPORTS_LOADING_POST_UPDATE:
            if (!checkIfStatus(action.payload)) return state;
            return action.payload;
        default:
            return state;
    }
};

export default reportsLoadingPostReducer;
