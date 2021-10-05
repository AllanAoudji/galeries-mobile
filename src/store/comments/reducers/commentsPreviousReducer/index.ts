import {
    COMMENTS_PREVIOUS_RESET,
    COMMENTS_PREVIOUS_UPDATE,
} from '#store/comments/actionTypes';

const initialState: { [key: string]: string } = {};
const commentsPreviousReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case COMMENTS_PREVIOUS_RESET:
            return initialState;
        case COMMENTS_PREVIOUS_UPDATE:
            if (
                !action.meta.query ||
                !action.meta.query.modelId ||
                typeof action.payload !== 'string'
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

export default commentsPreviousReducer;
