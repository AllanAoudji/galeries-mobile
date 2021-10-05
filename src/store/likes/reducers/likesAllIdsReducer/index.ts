import { checkIfAllIds } from '#store/checkers';
import {
    LIKES_ALL_IDS_RESET,
    LIKES_ALL_IDS_SET,
} from '#store/likes/actionTypes';

const initialState: { [key: string]: string[] } = {};
const likesAllIdsReducer = (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case LIKES_ALL_IDS_RESET:
            return initialState;
        case LIKES_ALL_IDS_SET:
            if (
                !action.meta.query ||
                !action.meta.query.frameId ||
                !checkIfAllIds(action.payload)
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

export default likesAllIdsReducer;
