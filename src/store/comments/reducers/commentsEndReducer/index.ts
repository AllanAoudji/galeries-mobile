import {
    COMMENTS_END_RESET,
    COMMENTS_END_UPDATE,
} from '#store/comments/actionTypes';

const initialState: { [key: string]: boolean } = {};
const commentsEndReducer = (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case COMMENTS_END_RESET:
            return initialState;
        case COMMENTS_END_UPDATE:
            if (
                !action.meta.query ||
                !action.meta.query.modelId ||
                typeof action.payload !== 'boolean'
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

export default commentsEndReducer;
