import { checkIfStatus } from '#store/checkers';
import { LIKES_STATUS_RESET, LIKES_STATUS_SET } from '#store/likes/actionTypes';

const initialState: { [key: string]: Store.Status } = {};
const likesStatusReducer = (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case LIKES_STATUS_RESET:
            return initialState;
        case LIKES_STATUS_SET:
            if (
                !action.meta.query ||
                !action.meta.query.frameId ||
                !checkIfStatus(action.payload)
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

export default likesStatusReducer;
