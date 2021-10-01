import {
    COMMENTS_BY_ID_REMOVE,
    COMMENTS_BY_ID_RESET,
    COMMENTS_BY_ID_SET,
    COMMENTS_BY_ID_UPDATE,
} from '#store/comments/actionTypes';

const initialState: { [key: string]: Store.Models.Comment } = {};
const commentsByIdReducer = (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case COMMENTS_BY_ID_REMOVE:
            if (typeof action.payload === 'string') {
                const newState = { ...state };
                delete newState[action.payload];
                return { ...newState };
            }
            return state;
        case COMMENTS_BY_ID_RESET:
            return initialState;
        case COMMENTS_BY_ID_SET:
            if (typeof action.payload === 'object')
                return {
                    ...state,
                    ...action.payload,
                };
            return state;
        case COMMENTS_BY_ID_UPDATE:
            if (typeof action.payload === 'object')
                return {
                    ...state,
                    [action.payload.id]: { ...action.payload },
                };
            return state;
        default:
            return state;
    }
};

export default commentsByIdReducer;
