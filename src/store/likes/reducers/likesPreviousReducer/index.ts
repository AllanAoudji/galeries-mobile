import {
    LIKES_PREVIOUS_RESET,
    LIKES_PREVIOUS_SET,
} from '#store/likes/actionTypes';

const initialState: { [key: string]: string } = {};
const likesPreviousReducer = (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case LIKES_PREVIOUS_RESET:
            return initialState;
        case LIKES_PREVIOUS_SET:
            if (
                !action.meta.query ||
                !action.meta.query.frameId ||
                typeof action.payload !== 'string'
            )
                return state;
            return {
                ...state,
                [action.meta.query.frameId]: action.payload,
            };
        default:
            return state;
    }
};

export default likesPreviousReducer;
