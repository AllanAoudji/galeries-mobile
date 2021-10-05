import { LIKES_END_RESET, LIKES_END_SET } from '#store/likes/actionTypes';

const initialState: { [key: string]: boolean } = {};
const likesEndReducer = (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case LIKES_END_RESET:
            return initialState;
        case LIKES_END_SET:
            if (
                !action.meta.query ||
                !action.meta.query.frameId ||
                typeof action.payload !== 'boolean'
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

export default likesEndReducer;
