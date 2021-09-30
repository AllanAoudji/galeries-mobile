import {
    COMMENTS_CURRENT_RESET,
    COMMENTS_CURRENT_UPDATE,
} from '#store/comments/actionTypes';

const initialState: string | null = null;
const commentsCurrentReducer = (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case COMMENTS_CURRENT_RESET:
            return initialState;
        case COMMENTS_CURRENT_UPDATE:
            if (typeof action.payload === 'string') return action.payload;
            return state;
        default:
            return state;
    }
};

export default commentsCurrentReducer;
