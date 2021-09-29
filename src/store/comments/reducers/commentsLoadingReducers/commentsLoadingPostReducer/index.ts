import { checkIfStatus } from '#store/checkers';
import {
    COMMENTS_LOADING_POST_RESET,
    COMMENTS_LOADING_POST_UPDATE,
} from '#store/comments/actionTypes';

const initialState: Store.Status = 'PENDING';
const commentsLoadingPostReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case COMMENTS_LOADING_POST_RESET:
            return initialState;
        case COMMENTS_LOADING_POST_UPDATE:
            if (checkIfStatus(action.payload)) return action.payload;
            return state;
        default:
            return state;
    }
};

export default commentsLoadingPostReducer;
