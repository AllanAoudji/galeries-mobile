import { checkIfAllIds } from '#store/checkers';
import {
    COMMENTS_ALL_IDS_RESET,
    COMMENTS_ALL_IDS_UPDATE,
} from '#store/comments/actionTypes';

const initialState: { [key: string]: string[] } = {};
const commentsAllIdsReducer = (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case COMMENTS_ALL_IDS_RESET:
            return initialState;
        case COMMENTS_ALL_IDS_UPDATE:
            if (
                !action.meta.query ||
                !action.meta.query.modelId ||
                !checkIfAllIds(action.payload)
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

export default commentsAllIdsReducer;
