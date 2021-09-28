import {
    LIKES_BY_ID_REMOVE,
    LIKES_BY_ID_RESET,
    LIKES_BY_ID_SET,
} from '#store/likes';

const initialState: { [key: string]: Store.Models.Like } = {};
const likesByIdReducer = (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case LIKES_BY_ID_REMOVE:
            if (typeof action.payload === 'string') {
                const newState = { ...state };
                delete newState[action.payload];
                return newState;
            }
            return state;
        case LIKES_BY_ID_RESET:
            return initialState;
        case LIKES_BY_ID_SET:
            if (typeof action.payload === 'object')
                return {
                    ...state,
                    ...action.payload,
                };
            return undefined;
        default:
            return state;
    }
};

export default likesByIdReducer;
