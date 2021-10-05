import { checkIfStatus } from '#store/checkers';
import {
    COMMENTS_STATUS_RESET,
    COMMENTS_STATUS_UPDATE,
} from '#store/comments/actionTypes';

const initialState: { [key: string]: Store.Status } = {};
const commentsStatusReducer = (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case COMMENTS_STATUS_RESET:
            return initialState;
        case COMMENTS_STATUS_UPDATE:
            if (
                !action.meta.query ||
                !action.meta.query.modelId ||
                !checkIfStatus(action.payload)
            )
                return state;
            return {
                ...state,
                [action.meta.query.modelId]: action.payload,
            };
        default:
            return state;
    }
};

export default commentsStatusReducer;
